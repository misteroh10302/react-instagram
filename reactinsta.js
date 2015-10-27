<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Hello World</title>
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

    <div id="footer"></div>

    

    <script type="text/jsx">
/** @jsx React.DOM */

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
            console.log(response);
            
            var responseData = response.response.posts.map(function(img){
                    
                    return { 
                            id: img.id, 
                            url: img.post_url, 
                            src: img.image_permalink, 
                            user: img.blog_name
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
                                    desc={img.desc} 
                                   likes={img.likes} 
                                   user={img.user} 
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
                    <img src={this.props.url} alt="" className="insta-img" />
                    <span className="insta-likes">{this.props.user}</span>
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
    <InstagramFeed source="http://api.tumblr.com/v2/blog/madelineomoore.com/posts?api_key=V0EUYuGTiPOFIY0gxZbuOJTIUYwPQX49i6wOHUkwrwiNfCfjtw" polling="10000" />,
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

var FooterElements = React.createClass({
    render:function(){
        return(

            <div className="footer">
                House of Madeline
            </div>
            )
    }
});

ReactDOM.render(

    <FooterElements />, footer

    );

    </script>
  </body>
</html>
