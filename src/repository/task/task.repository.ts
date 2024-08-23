import { queryBuilder } from '../../utils/qsb.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../../config/db/database.js';
import { TTask } from '../../entities/task/schema/task.type.js';

const getTaskList = async (id: number) => {
  const queryText = 'select * from task where storyID = ?';
  const [rows] = await pool.query<RowDataPacket[]>(queryText, id);
  return rows[0] as TTask[];
};

const getTaskById = async (storyID: number, taskID: number) => {
  const queryText = 'select * from task where storyID = ? and taskID = ?';
  const [rows] = await pool.query<RowDataPacket[]>(queryText, [
    storyID,
    taskID,
  ]);
  return rows[0] as TTask | undefined;
};

const postTask = async (item: TTask) => {
  const question = Object.values(item).reduce<string>((acc, _, index) => {
    if (index === 0) {
      acc += '?';
    } else {
      acc += ', ?';
    }
    return acc;
  }, '');
  const queryString = `insert into task (${Object.keys(item).join(', ')}) VALUES (${question})`;
  const [rows] = await pool.query<ResultSetHeader>(queryString, [
    item.storyID,
    item.description,
    item.flag,
  ]);
  return rows.affectedRows;
};

const updateTask = async (id: string, item: TTask) => {
  const { fields, values, questionMarkString, matchingPair } =
    queryBuilder(item);
  const queryString = `update story set type = ?, title = ?, point = ? where storyID = ?`;
};

const deleteTask = async (id: string) => {
  const queryString = `delete from task where taskID = ?`;
  const [rows] = await pool.query<ResultSetHeader>(queryString, [id]);
  return rows.affectedRows;
};

export const TaskRepository = {
  getTaskList,
  updateTask,
  postTask,
  deleteTask,
};
