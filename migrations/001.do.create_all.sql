CREATE TABLE folders(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    folder_name TEXT NOT NULL
);

CREATE TABLE notes(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    note_name TEXT NOT NULL,
    modified TIMESTAMP DEFAULT now() NOT NULL,
    content TEXT NOT NULL,
    folder INTEGER REFERENCES folders(id) ON DELETE CASCADE NOT NULL
);