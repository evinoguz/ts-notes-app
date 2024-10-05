// tag type
export type Tag = {
  label: string;
  value: string;
};

// note type
export type NoteData = {
  title: string;
  tags: Tag[];
  markdown: string;
};

// state note type
export type Note = {
  id: string;
} & NoteData;
