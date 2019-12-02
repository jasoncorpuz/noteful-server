Folders : ID, NAME

Notes: ID, note_name, MODIFIED, FOLIDER,  CONTENT

psql -U dunder_mifflin -d noteful -f ./seeds/seeds.folders.sql
psql -U dunder_mifflin -d noteful -f ./seeds/seeds.notes.sql