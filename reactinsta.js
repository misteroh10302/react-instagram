<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title>React X Instagram</title>
    <style> 

    #content {
        max-width: 1070px;
        margin: 0 auto;
    }

    .insta-img-ctn {
            display: inline-block;
            float: left;
    }

    .nav {
       text-align: center;
    }



    </style>
  </head>
  <body>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react-dom.js"></script>
    <script src="http://fb.me/JSXTransformer-0.12.2.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
 
    <div id="content">
        <div class="nav"></div>
        <div class="insta-ctn js-insta-ctn"></div>
    </div>

  
    <script type="text/jsx">
/** @jsx React.DOM */


/**

var PersonTable = React.createClass({
    getInitialState:function(){
        return{
            data: [

                {id: 1, fname: "Madeline", lname: "Omoore", insta: "http://media.virbcdn.com/cdn_images/resize_500x500/5d/3c8eff20d8a4638d-2014pheobe1468.jpg"},
                 {id: 2, fname: "Madeline", lname: "Omoore", insta: "http://media.virbcdn.com/cdn_images/resize_500x500/5d/3c8eff20d8a4638d-2014pheobe1468.jpg"},
                 {id:3, fname: "this", lname:"is", insta: "http://media.virbcdn.com/cdn_images/resize_500x500/5d/3c8eff20d8a4638d-2014pheobe1468.jpg"}
            ]
        }
    },



    render:function(){
        var rows = this.state.data.map(function(person, i){
            return <PersonRow data={person} key={i}/>
        })

        return <table> {rows} </table>
    }

});


var PersonRow = React.createClass({
    render:function(){
        return(
            <tr>
                <td>{this.props.data.id} </td>
                <td>{this.props.data.fname} </td>
                <td> {this.props.data.lname}</td>
                <td><img src= {this.props.data.insta}/></td>
            </tr>
            )
    }
});


  $.ajax({
                url: "http://api.tumblr.com/v2/blog/madelineomoore.com/posts?api_key=V0EUYuGTiPOFIY0gxZbuOJTIUYwPQX49i6wOHUkwrwiNfCfjtw&limit=50",
                dataType: 'jsonp',
                success: function(posts){
                    posting = posts.response.posts;
                  console.log(posting);
                  $("body").html(posting).toString;
                }    
            });


React.render(<PersonTable  />, document.body);


var TumblrTable  = React.createClass({
    componentDidMount:function(){
         $.get(this.props.url, function (data) {
                this.setState(data);
                console.log(data);
            }.bind(this));
        
    },

    render: function(){

        return (
            <div>
                    {this.state.data} </div>
           )
    }
});

React.render(
    <TumblrTable source="http://api.tumblr.com/v2/blog/madelineomoore.com/posts?api_key=V0EUYuGTiPOFIY0gxZbuOJTIUYwPQX49i6wOHUkwrwiNfCfjtw&limit=50"/>, document.body

    );

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      console.log(result);
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.instagram.com/v1/media/popular/?access_token=1227236256.5c53f4a.77d8b85884924c3aa5027e2252e4e80a" />,
  document.body
);
**/
/** @jsx React.DOM */

console.clear();

/**
 *  TODOS
 *  Trans in/out on each poll
 *  Video Check
 *  Add favourite?
 *  Instead of flushing DOM concat?
 *  Sticky posts?
 *  Scroll to top
 *  Pull refresh
 */

(function() {
    
var instaCtn = document.querySelector('.js-insta-ctn');

var InstagramFeed = React.createClass({
    getInitialState: function() {
        return {images: []};
    },
    fetchData: function() {
        $.ajax({
        url: this.props.source,
      type: "GET",
      dataType: "jsonp",
    }).done(function(response) {
            
            // Make data object
            var responseData = response.data.map(function(img){
                    
                    return { 
                            id: img.id, 
                            url: img.link, 
                            src: img.images.low_resolution.url, 
                            desc: img.caption ? img.caption.text : '',
                            likes: img.likes.count,
                            user: img.user.username
                    };

            });
            
            this.setState({
                images: responseData
            });
    }.bind(this));
    },
    componentDidMount: function() {
        this.fetchData();
        setInterval(this.fetchData, this.props.polling);
    },
    render: function() {
        
        var instaImages = this.state.images.map(function(img) {
                return <InstagramPost 
                                    key={img.id}
                                    url={img.url} 
                                    src={img.src} 
                                    //desc={img.desc} 
                                   // likes={img.likes} 
                                   // user={img.user} 
                             />
        });
        
        return (
            <div>
                {instaImages}
            </div>
        )
    },
    componentDidUpdate: function() {
        console.log('running');
       
    }
});
    
var InstagramPost = React.createClass({
    getInitialState: function() {       
        return {};
    },
    render: function() {
        return (

            <a href={this.props.url} className="m-insta js-insta" target="_blank">

                <div className="insta-img-ctn">
                    <img src={this.props.src} alt="" className="insta-img" />
                    <span className="insta-likes">{this.props.likes}</span>
                </div>  
                <div className="insta-content">
                    <p className="insta-text">{this.props.desc}</p>
                    <p className="insta-user">{this.props.user}</p>
                </div>
            </a>
        )
    }
});



ReactDOM.render(
    <InstagramFeed source="https://api.instagram.com/v1/users/19156171/media/recent/?access_token=19156171.1677ed0.885b32155acb4af6b5863db2433783d7" polling="10000" />,
    instaCtn
);



})();


var nav = document.querySelector('.nav');

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="navbar">
        <span className="left"> Click </span>
        <span className="brand"> MADELINE </span>
        <span className="right"> menu </span>
      </div>
    );
  }
});

ReactDOM.render(
    <CommentBox />,
    nav
);


    </script>
  </body>
</html>
