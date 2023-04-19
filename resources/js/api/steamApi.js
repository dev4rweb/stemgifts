export const getWishListApi = steam_id => {
    return  axios.post(`/api/steam-user-games`, {profile_id: steam_id})
        .then(res => {
            console.log('getWishListApi', res)
            return res
        }).catch(err => {
        console.error('getWishListApi err', err.response.data)
        return err
    });
};
