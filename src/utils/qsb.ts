export type QueryObjectType = {
  fields: string[];
  values: string[];
  questionMarkString?: string;
  matchingPair?: string;
};

const queryBuilder = (
  item: Record<string, string | number | null | undefined | boolean>,
) => {
  return Object.entries(item).reduce<QueryObjectType>(
    (acc, [key, value], index) => {
      acc.fields.push(key);
      acc.values.push(String(value));
      acc.questionMarkString += (index > 0 ? ', ' : '') + '?';
      acc.matchingPair += (index > 0 ? ', ' : '') + `${key} = ?`;
      return acc;
    },
    {
      fields: [],
      values: [],
      questionMarkString: '',
      matchingPair: '',
    },
  );
};

export { queryBuilder };
