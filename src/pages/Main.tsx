import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../types";
import Card from "../components/Card";

type Props = {
  notes: Note[];
  availableTags: Tag[];
};

const Main = ({ notes, availableTags }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filtredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(title.toLowerCase()) &&
      selectedTags.every((s_tag) => note.tags.some((note_tag) => note_tag.value === s_tag.value))
  );

  return (
    <div className="container mx-auto py-5">
      {/* top area */}
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div className="d-flex gap-3 align-items-center">
          <img src="/note_logo.png" width={45} alt="white notebook on red background" />
          <h1>Notlar</h1>
        </div>

        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>
      {/* bottom area */}
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="select">Etikete Göre Ara</Form.Label>
              <ReactSelect
                id="select"
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                isMulti
                options={availableTags}
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* Not list */}
      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <Card note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Main;
