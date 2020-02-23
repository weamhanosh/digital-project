import initialState from '../../initialState'

const MyPopoverReducer = (state = initialState.myPopover, action) => {
    // console.log('MyPopoverReducerState=', state);
    switch (action.type) {

        default: //otherwise state is lost!
            return state;
    }
};

export default MyPopoverReducer;
