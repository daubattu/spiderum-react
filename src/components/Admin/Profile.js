import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <ul className="list-group">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xs-offset-0 col-sm-offset-0 col-md-offset-2 col-lg-offset-2 toppad" >
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Sheena Shrestha</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" className="img-circle img-responsive" /> </div>
                  <div className="col-xs-10 col-sm-10 hidden-md hidden-lg">
                    <dl>
                      <dt>JOB: </dt>
                      <dd>Administrator</dd>
                      <dt>HIRE DATE</dt>
                      <dd>11/12/2013</dd>
                      <dt>DATE OF BIRTH</dt>
                         <dd>11/12/2013</dd>
                      <dt>GENDER</dt>
                      <dd>Male</dd>
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
        </div>
      </div>
    )
  }
}

export default Profile;
