const ExtendMembersList = (members, allTeamMembers) => {
  if (!allTeamMembers) return {}
  let extendedList = {}
  _.keys(members).map(memberKey => {
    let key = members[memberKey] && members[memberKey].id
    if (!key) return 
    extendedList[key] = {
      ...allTeamMembers[key],
      id: memberKey
    }
  })
  return extendedList
}

export default ExtendMembersList