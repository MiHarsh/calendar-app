import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Event } from './entities/event.entity';
import { memoryStorage } from 'multer';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ): Event {
    console.log(typeof file, createEventDto);

    return this.eventsService.create(createEventDto, file);
  }

  @Get()
  findAll(): Event[] {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findEventById(@Param('id') id: string): Event {
    return this.eventsService.findEventById(id);
  }

  @Get('/date/:date')
  findEventByDate(@Param('date') date: string): Event[] {
    return this.eventsService.findEventByDate(date);
  }

  @Delete(':id')
  deleteEventById(@Param('id') id: string): boolean {
    return this.eventsService.deleteEventById(id);
  }
}
