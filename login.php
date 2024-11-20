<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
  <title>Registration system PHP and MySQL</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" type="text/css" href="nav.css">

<nav>
        <a href="basic.html">Home</a>
        <div class="dropdown">
            <a href="#button4" class="dropbtn">About US &#9662;</a>
            <div class="dropdown-content">
                <a href="history.html">History</a>
                <a href="features.html">Features</a>
                <a href="contact.html">Contact Us</a>
            </div>
        </div>
        <a href="podcast.html">Podcast</a>
    
       
       
    
        <a href="feedback.html">Feedback</a>
        <a href="login.php">Login</a>
	<a href="index.html">Game</a>
<a href="report.html">Report</a>
<a href="http://127.0.0.1:5001/">
                chatbot
            </a>

        
    </nav>

</head>
<body>
  <div class="header">
  	<h2>Login</h2>
  </div>
	 
  <form method="post" action="login.php">
  	<?php include('errors.php'); ?>
  	<div class="input-group">
  		<label>Username</label>
  		<input type="text" name="username" >
  	</div>
  	<div class="input-group">
  		<label>Password</label>
  		<input type="password" name="password">
  	</div>
  	<div class="input-group">
  		<button type="submit" class="btn" name="login_user">Login</button>
  	</div>
  	<p>
  		Not yet a member? <a href="register.php">Sign up</a>
  	</p>
  </form>
</body>
</html>