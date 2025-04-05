export const getChangedFields = <
  T extends Record<string, any>,
  U extends Record<string, any>,
>(
  currentData: T,
  initialData: U,
  fieldsToCompare?: (keyof T)[]
): Partial<T> => {
  const changedFields: Partial<T> = {};

  const fieldsToCheck =
    fieldsToCompare || (Object.keys(currentData) as (keyof T)[]);

  fieldsToCheck.forEach((field) => {
    if (field in initialData) {
      const initialValue = initialData[field as keyof U];
      const currentValue = currentData[field];

      if (currentValue === undefined) {
        if (initialValue !== null && initialValue !== 0) {
          changedFields[field] = currentValue;
        }
      } else if (initialValue !== currentValue) {
        changedFields[field] = currentValue;
      }
    }
  });

  return changedFields;
};
