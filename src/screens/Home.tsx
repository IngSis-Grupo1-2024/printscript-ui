import {withNavbar} from "../components/navbar/withNavbar.tsx";
import {SnippetTable} from "../components/snippet-table/SnippetTable.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SnippetDetail} from "./SnippetDetail.tsx";
import {Drawer} from "@mui/material";
import {useDefaultConfig, useGetSnippets, useSaveUserName} from "../utils/queries.tsx";
import {usePaginationContext} from "../contexts/paginationContext.tsx";
import useDebounce from "../hooks/useDebounce.ts";
import {useAuth0} from "@auth0/auth0-react";
import {queryClient} from "../App.tsx";

const HomeScreen = () => {
  const {id: paramsId} = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [snippetName, setSnippetName] = useState('');
  const [snippetId, setSnippetId] = useState<string | null>(null)
  const {page, page_size, count, handleChangeCount} = usePaginationContext()
  const {data, isLoading} = useGetSnippets(page, page_size, snippetName)
  const { user} = useAuth0();
  const {mutateAsync: saveUserName} = useSaveUserName({
    onSuccess: () => queryClient.invalidateQueries('listSnippets')
  })
  const {mutateAsync: defaultConfig} = useDefaultConfig({
    onSuccess: () => queryClient.invalidateQueries('listSnippets')
  })
  useEffect(() => {
    if (data?.count && data.count != count) {
      handleChangeCount(data.count)
    }
    if(user !== undefined) {
      if(user.nickname !== undefined) saveUserName(user.nickname)
    }
    defaultConfig()
  }, [count, data?.count, handleChangeCount, user]);


  useEffect(() => {
    if (paramsId) {
      setSnippetId(paramsId);
    }
  }, [paramsId]);

  const handleCloseModal = () => setSnippetId(null)
  const {isAuthenticated} = useAuth0();


  // DeBounce Function
  useDebounce(() => {
        setSnippetName(
            searchTerm
        );
      }, [searchTerm], 800
  );

  const handleSearchSnippet = (snippetName: string) => {
    setSearchTerm(snippetName);
  };

  return ( isAuthenticated &&
      <>
        <SnippetTable loading={isLoading} handleClickSnippet={setSnippetId} snippets={data?.snippets}
                      handleSearchSnippet={handleSearchSnippet}/>
        <Drawer open={!!snippetId} anchor={"right"} onClose={handleCloseModal}>
          {snippetId && <SnippetDetail handleCloseModal={handleCloseModal} id={snippetId}/>}
        </Drawer>
      </>
  )
}

export default withNavbar(HomeScreen);

