--Create 'TODO' Table
CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task character varying(50),
	completed character varying(20)
);


-- Dummy Data
INSERT INTO "todo" ("id", "task", "completed") VALUES ('1', 'go to class','------');

INSERT INTO "todo" ("id", "task", "completed") VALUES ('2', 'attend lecture', '------');

INSERT INTO "todo" ("id", "task", "completed") VALUES ('3', 'go to toastmasters', '------');

INSERT INTO "todo" ("id", "task", "completed") VALUES ('4', 'eat lunch', '------');

INSERT INTO "todo" ("id", "task", "completed") VALUES ('5', 'group project', '------');

INSERT INTO "todo" ("id", "task", "completed") VALUES ('6', 'start homework', '------');

INSERT INTO "todo" ("id", "task", "completed") VALUES ('7', 'drive home', '------');
