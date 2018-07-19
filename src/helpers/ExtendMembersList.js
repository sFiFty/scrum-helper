const ExtendMembersList = (members, allTeamMembers) => {
  if (!allTeamMembers) return {};
  const extendedList = {};
  _.keys(members).map((memberKey) => {
    const key = (members[memberKey] && members[memberKey].id) || memberKey;
    if (!key) return;
    extendedList[key] = {
      ...allTeamMembers[key],
      key: memberKey,
    };
  });
  return extendedList;
};

export default ExtendMembersList;
