import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { type SortKey } from "../../utils/typeAndData";
import { SxProps } from "@mui/material/styles";

const sortKeys: SortKey[] = ["published_at", "Best"];

const BasicSelect = ({
  sort,
  sx,
}: {
  sort: (objectKey: SortKey) => void;
  sx: SxProps;
}) => {
  const [sortKey, setSortKey] = React.useState<SortKey>("published_at");

  const handleChange = (event: SelectChangeEvent) => {
    setSortKey(event.target.value as SortKey);
    sort(event.target.value as SortKey);
  };

  return (
    <Box sx={sx}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortKey}
          label="Sort"
          onChange={handleChange}
        >
          {sortKeys.map((key) => (
            <MenuItem key={key} value={key}>
              {key === "published_at" ? "New" : "Best"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
