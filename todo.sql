--Create 'TODO' Table
CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task_to_do character varying(50)
);


-- Dummy Data
INSERT INTO "todo" ("id", "task_to_do") VALUES ('1', 'go to class');

INSERT INTO "todo" ("id", "task_to_do") VALUES ('2', 'attend lecture');

INSERT INTO "todo" ("id", "task_to_do") VALUES ('3', 'go to toastmasters');

INSERT INTO "todo" ("id", "task_to_do") VALUES ('4', 'eat lunch');

INSERT INTO "todo" ("id", "task_to_do") VALUES ('5', 'group project');

INSERT INTO "todo" ("id", "task_to_do") VALUES ('6', 'start homework');

INSERT INTO "todo" ("id", "task_to_do") VALUES ('7', 'drive home');