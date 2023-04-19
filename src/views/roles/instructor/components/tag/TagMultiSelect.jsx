import { MultiSelect } from '@mantine/core';

export function TagMultiSelect() {
  return (
    <MultiSelect
      data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
      label="Your favorite frameworks/libraries"
      placeholder="Pick all that you like"
      searchable
      nothingFound="Nothing found"
    />
  );
}

export default TagMultiSelect;
