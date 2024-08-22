import { queryBuilder } from '@/utils/qsb.ts';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from 'src/config/db/database.ts';
import { TTask } from 'src/entities/task/schema/task.type.ts';

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
  const result = queryBuilder(item);
  console.log('postTask', result);
  //   const queryString = 'insert into task () VALUES ()';
  //   const [rows] = await pool.query<ResultSetHeader>(queryString);
  //   return rows.affectedRows;
  return 0;
};

const updateTask = async (id: string, item: TTask) => {
  // const { fields, values, questionMarkString, matchingPair } =
  //   queryBuilder(item);
  const queryString = `update story set type = ?, title = ?, point = ? where storyID = ?`;
};

const deleteTask = async (id: string) => {
  const queryString = `delete from task where taskID = ?`;
  const [rows] = await pool.query<ResultSetHeader>(queryString, [id]);
  return true;
};

export const TaskRepository = {
  getTaskList,
  postTask,
};
