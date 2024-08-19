import { queryBuilder } from '../../utils/qsb';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../../config/db/database';
import { TStory } from '../../entities/story/schema/story.type';
import wrapAPI from '@/utils/wrapAPI';

const getStoryList = async () => {
  const queryText = 'select * from story limit 10';
  const [rows] = await pool.query<RowDataPacket[]>(queryText);
  return rows as TStory[];
};

const getStoryById = async (id: string) => {
  const queryText = `select * from story where storyID = ?`;
  const [rows] = await pool.query<RowDataPacket[]>(queryText, id);
  return rows[0] as TStory;
};

const postStory = async (story: {
  title: string;
  type: 'story' | 'epic' | 'spike';
  point: number;
}) => {
  const { fields, values, questionMarkString, matchingPair } =
    queryBuilder(story);
  const queryString = `INSERT INTO story (${fields.join(', ')}) VALUES (${questionMarkString})`;
  const [rows] = await pool.query<ResultSetHeader>(queryString, values);
  return rows.affectedRows;
};

const updateStory = async (id: string, item: TStory) => {
  const { fields, values, questionMarkString, matchingPair } =
    queryBuilder(item);
  const queryString = `update story set ${matchingPair} where storyID = ?`;
  const [rows] = await pool.query<ResultSetHeader>(queryString, [
    ...values,
    id,
  ]);
  return rows;
};

const deleteStory = async (id: string) => {
  const queryString = `delete from story where storyID = ?`;
  const [rows] = await pool.query<ResultSetHeader>(queryString, [id]);
  return true;
};

export const storyRepository = {
  getStoryList,
  getStoryById,
  postStory,
  updateStory,
  deleteStory,
};