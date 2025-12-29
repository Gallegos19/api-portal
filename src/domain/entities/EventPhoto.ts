export interface EventPhotoProps {
    id: string;
    id_event: string;
    id_photo: string;
  }
  
  export class EventPhoto {
    private props: EventPhotoProps;
  
    constructor(props: EventPhotoProps) {
      this.props = props;
    }
  
    get id(): string {
      return this.props.id;
    }
  
    get eventId(): string {
      return this.props.id_event;
    }
  
    get photoId(): string {
      return this.props.id_photo;
    }
  
    // Static factory method
    static create(props: Omit<EventPhotoProps, 'id'> & { id?: string }): EventPhoto {
      return new EventPhoto({
        id: props.id || crypto.randomUUID(),
        id_event: props.id_event,
        id_photo: props.id_photo
      });
    }
  
    // Method to convert entity to a plain object
    toJSON(): EventPhotoProps {
      return { ...this.props };
    }
  }