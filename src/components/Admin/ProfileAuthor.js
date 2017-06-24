import React, {Component} from 'react';
import axios from 'axios';

class ProfileAuthor extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }
  componentWillMount() {
    axios.get(`http://localhost:8080/api/users/${this.props.match.params.author}`)
      .then(res => {
        console.log(res);
        this.setState({user: res.data});
      })
  }
  time() {
    return new Date(this.state.user.birthday);
  }
  render() {
    const styleProfileAuthor = {
      marginTop: '30px',
      background: 'white',
      padding: '30px'
    }
    const styleProfileAvatar = {
      width: '100px',
      height: '100%'
    }
    const styleGlyphyicon = {
      marginRight: '10px'
    }
    const { user } = this.state;
    let time = new Date(`${user.birthday}`);
    console.log(time);
    return(
      <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xs-offset-0 col-sm-offset-0 col-md-offset-2 col-lg-offset-2 toppad" >
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">{user.username}</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 col-lg-3">
                {
                  user.avatar !== ''
                  ? <img alt="avatar" src={user.avatar} className="img-circle img-responsive" />
                  : <img alt="avatar" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" className="img-circle img-responsive" />
                }
              </div>
              <div className="col-xs-10 col-sm-10 hidden-md hidden-lg">
                <dl>
                  <dt>Job:</dt>
                  <dd>{user.job}</dd>
                  <dt>DATE OF BIRTH</dt>
                     <dd>{time.getDate()} - {time.getMonth()} - {time.getFullYear()}</dd>
                  <dt>GENDER</dt>
                  <dd>{user.gender}</dd>
                </dl>
              </div>
              <div className=" col-md-9 col-lg-9 ">
                <table className="table table-user-information">
                  <tbody>
                    <tr>
                      <td>Department:</td>
                      <td>Programming</td>
                    </tr>
                    <tr>
                      <td>Hire date:</td>
                      <td>06/23/2013</td>
                    </tr>
                    <tr>
                      <td>Date of Birth</td>
                      <td>01/24/1988</td>
                    </tr>
                       <tr>
                           <tr>
                      <td>Gender</td>
                      <td>Female</td>
                    </tr>
                      <tr>
                      <td>Home Address</td>
                      <td>Kathmandu,Nepal</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td><a href="mailto:info@support.com">info@support.com</a></td>
                    </tr>
                      <td>Phone Number</td>
                      <td>123-4567-(Landline) 555-4567-(Mobile)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            <div className="panel-footer">
              <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-envelope"></i></a>
              <span className="pull-right">
                <a href="edit.html" data-original-title="Edit this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-warning"><i className="glyphicon glyphicon-edit"></i></a>
                <a data-original-title="Remove this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-danger"><i className="glyphicon glyphicon-remove"></i></a>
              </span>
            </div>
        </div>
      </div>
    )
  }
}
export default ProfileAuthor;
