import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {colors} from '../../../styles';
import { showAlertWithCallback } from '../../../helpers'; 
import * as ACTION_TYPES from '../../../actions/ActionTypes';

import { postComment, getAcceptedComments } from '../../../actions/CommentActions';
import { ImageView } from '../../../components';
_isAlertShowing = false;
class CommentView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            comment : ""
        }
    }
    componentDidMount() {
        this.onRefresh();
    }

    getCommentItem() {

    }

    componentWillReceiveProps(nextProps) {
        if(this.props.comment.success == false && nextProps.comment.success == true &&
            nextProps.comment.currentAction == ACTION_TYPES.POST_COMMENT_SUCCESS) {
                this.onRefresh();
        } 
        if(this.props.comment.error != nextProps.comment.error && nextProps.comment.error &&
            nextProps.comment.currentAction == ACTION_TYPES.POST_COMMENT_FAILURE) {
                if(_isAlertShowing) return;
                _isAlertShowing = true;
                showAlertWithCallback("Whoops", nextProps.comment.error, ()=>{
                    _isAlertShowing = false;
                });
        } 
    }

    onRefresh = () => {
        const { user } = this.props; 
        if( user && user.id) {
            this.props.dispatch(getAcceptedComments(user.id))
       
        }
    }
    onSend = (text) => {
        const { auth, user} = this.props;
        if(text && text.length >0) {
            this.props.dispatch(postComment(auth.user.id, user.id, text));
            this.setState({comment: ''})
        }
    }
    getWriteComment(){
        return <View style={{height: 64, backgroundColor: colors.red, 
                alignSelf:'stretch', marginTop: 8}}>
            <View style={{ flex:1, 
                         backgroundColor:'#ddc2b7', marginHorizontal:16, marginVertical:8,
                         borderRadius: 8, paddingVertical:8}}>
                <TextInput
                    style={{marginLeft:16, flex:1, fontSize: 17}}
                    placeholder="Write a comment ..."
                    placeholderTextColor={'#6c6f6d'}
                    value={this.state.comment}
                    onChangeText={text => {
                        this.setState({comment: text})
                    }}
                    multiline={false}
                    onSubmitEditing={text => {
                    
                        this.onSend(this.state.comment);
                    }}
                    returnKeyType={'send'}
                />
            </View>
            
        </View>
    }
    getCommentItem = (comment) => {
        return <View style={{alignSelf:'stretch', height: 65, 
               }}
               key={'commentitem'+comment.id}
               >
            <View style={{alignSelf:'stretch', height: 64, 
               flexDirection:'row', alignItems:'center', marginLeft: 16}}
               key={'commentitem'+comment.id}>
                <ImageView
                    shortUrl={comment.smallImageUrl}
                    defaultImage={require('../../../../assets/images/boneprofile.png')}
                    style={{width: 48, height: 48, borderRadius: 24}}
                />
                <Text style={{fontSize: 17, color: 'white', marginEnd:16, marginStart: 16, flex:1}} numberOfLines={2}> 
                    {comment.review}
                </Text>
                {
                    !this.props.isPublic && 
                    <View style={{height: 48, width: 0.5, backgroundColor: colors.gray}}/>
                }
                {
                    !this.props.isPublic && 
                    
                    <TouchableOpacity style={{ width:64, height:64, justifyContent:'center', alignItems:'center', alignSelf:'flex-end'}}>
                        <Image style={{width: 32, height: 32}} source={require('../../../../assets/images/dot_chat.png')} resizeMode='contain'/>
                    </TouchableOpacity>
                }
            </View>
            <View style={{alignSelf:'stretch',height:0.5, marginHorizontal:16, backgroundColor:colors.gray}}/>
        </View>
    }
    
    getComments(isPublic) {
        const { comments } = this.props.comment;
        return <View style={{alignSelf:'stretch', backgroundColor:colors.black}}>
      
            {
                
                comments.map(comment => {return this.getCommentItem(comment)})
            }
        </View>
       
    }
    render() {
        return (<View  style={styles.container}>
            {
                this.props.isPublic &&
                this.getWriteComment()
            }
            {
                this.getComments(this.props.isPublic)
            }

        </View>
        );
    }
}


CommentView.proptypes = { 
    user: PropTypes.object.isRequired,
    isPublic: PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
});

const mapStateToProps = (state) => ({ auth: state.auth, comment: state.comment });

export default connect(mapStateToProps)(CommentView);
  