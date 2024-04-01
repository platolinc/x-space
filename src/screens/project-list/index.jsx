import { clean0bject } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const [list, setlist] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(clean0bject(param))}`).then(async response => {
      if(response.ok) {
        setlist(await response.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}