export interface Document {
  id?: number;
  title: string;
  file: File;
  description: string;
  dateUploaded: Date;
  type: string;
}
