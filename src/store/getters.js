const getters = {
    isLoading: state => state.app.isLoading,
    defaultAderess: state => state.app.defaultAderess,
    defaultAvatar: state => state.app.defaultAvatar,
    defaultLogin: state => state.app.defaultLogin,
    goodsList:state => state.app.goodsList,
    district:state => state.app.district,
    isKeep:state =>  state.app.isKeep
}
export default getters