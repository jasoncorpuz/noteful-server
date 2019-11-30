Folders : ID, NAME

Notes: ID, NAME, MODIFIED, FOLIDER, ID, CONTENT

psql -U dunder_mifflin -d noteful -f ./seeds/seeds.folders.sql
psql -U dunder_mifflin -d noteful -f ./seeds/seeds.notes.sql