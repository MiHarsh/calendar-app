import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  create(createEventDto: CreateEventDto, file: Express.Multer.File): Event {
    console.log('DTO:', createEventDto);
    console.log('Uploaded file:', file);
    const event = {
      id: uuidv4(),
      ...createEventDto,
      media: file,
      createdAt: new Date(),
    };

    this.events.push(event);
    console.log(this.events.length);
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
}
