const formatDisplayName = (user) => {
    return user.subname ? `${user.subname}@Suimail` : user.name;
};

export default formatDisplayName;