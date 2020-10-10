import initialState from '../../initialState'

const MyPopoverReducer = (state = initialState.myPopover, action) => {
    switch (action.type) {

        default: //otherwise state is lost!
            return state;
    }
};

export default MyPopoverReducer;
