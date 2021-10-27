<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<style >
	input {
		background: grey;
		color: white;
	}
	
	form {
		text-align: center;
		
		
	}
	legend {
		text-align: center;

	}
	fieldset {
		display: inline-block;
		align-content: center;
		
	}
</style>
<body>
   <form action="sample.php" method="POST"> 
   		<?php
		if (isset($_POST['submit'])) {
			$conn=mysqli_connect('localhost','root','','sa');
			if (!$conn) {  
				echo mysqli_error();
			}
			$name=$_POST['name'];
			$number=$_POST['number'];
	
			$query="INSERT INTO `student` VALUES ('','$name','$number')";
			if ($query_run=mysqli_query($conn,$query)) {
				echo "Registration sucess";
			}
			else
			{
				echo "Sorry Try again";
			}
		}
		else
		{
			echo "All field are required";
		}
		?>
   	   <fieldset class="box">
   	   	<legend>Form</legend>
   	   	
   	   	  <label>name:
   	   	  	 <input type="text" name="name" required="required">
   	   	  	
   	   	  </label>
   	   	  <p>
   	   	  <label>
   	   	  	     Number:
   	   	  	     <input type="text" name="number">
   	   	  </label>
   	   	</p>
   	   	<input type="submit" name="submit" value="submit">
   	   </fieldset>

   </form>
</body>
</html>