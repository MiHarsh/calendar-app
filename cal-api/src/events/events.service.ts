import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { Cron, CronExpression } from '@nestjs/schedule';
// import { UpdateEventDto } from './dto/update-event.dto';
import { EventsGateway } from './events.gateway';

@Injectable()
export class EventsService {
  constructor(private readonly eventsGateway: EventsGateway) {}
  private events: Event[] = [];
  private notifiedEventIds = new Set<string>();

  create(createEventDto: CreateEventDto, file?: Express.Multer.File): Event {
    // console.log('DTO:', createEventDto);
    //console.log('Uploaded file:', file);
    const event = {
      id: uuidv4(),
      ...createEventDto,
      media: file ?? undefined,
      createdAt: new Date(),
    };

    this.events.push(event);
    // console.log(this.events.length);
    return event;
  }

  findAll(): Event[] {
    return this.events;
  }

  findEventById(id: string): Event {
    const result = this.events.find((event) => event.id === id);
    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return result;
  }

  findEventByDate(date: string): Event[] {
    const parsedDate = new Date(date);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      return []; // Return an empty array for invalid date
    }

    const targetDate = parsedDate.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

    return this.events.filter((event) => {
      // Compare only the date part (YYYY-MM-DD)
      return event.date === targetDate;
    });
  }

  deleteEventById(id: string): boolean {
    const index = this.events.findIndex((event) => event.id === id);
    if (index === -1) {
      return false;
    }
    this.events.splice(index, 1);
    return true;
  }

  @Cron('*/1 * * * *')
  async checkAndNotifyEvents() {
    const now = new Date();
    // console.log(typeof this.events.startTime);
    for (const event of this.events) {
      const startTime = new Date(event.startTime);
      const timeDiffMs = startTime.getTime() - now.getTime();
      const diffInMinutes = timeDiffMs / (60 * 1000);
      console.log(startTime);
      // if (diffInMinutes >= 4.5 && diffInMinutes <= 5.5) {
      if (!this.notifiedEventIds.has(event.id)) {
        console.log(startTime);
        this.eventsGateway.notifyEventStart(event); // Emit full event object
        this.notifiedEventIds.add(event.id);
      }
      //}
    }
  }
}
