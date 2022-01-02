import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TodoGroup, TodoItem, TodoTag } from "./classes";

const Todo = () => {
  const [tab, setTab] = useState<TodoGroupID | null>(null);

  const tagQuery = useQuery("todo-tags", TodoTag.all);
  const groupQuery = useQuery("todo-groups", TodoGroup.all);

  useEffect(() => {
    if (groupQuery.data) setTab(groupQuery.data[0].id);
  }, [groupQuery.data]);

  const itemQuery = useQuery(["todo-items"], () => TodoItem.all(tab!), {
    enabled: tagQuery.isSuccess && tab !== null,
  });

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {tab !== null && (
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={() => {}} aria-label="todo tabs">
              {groupQuery.data!.map((group) => (
                <Tab label={group.title} value={group.id} key={group.id} />
              ))}
            </TabList>
          </Box>
          {groupQuery.data!.map((group) => (
            <TabPanel value={group.id} key={group.id}>
              {group.title}
            </TabPanel>
          ))}
        </TabContext>
      )}
    </Box>
  );
};

export default Todo;
