<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Ltweb2015</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<link rel="stylesheet" href="{{asset('css/ltweb.css')}}">
	<link rel="stylesheet" href="{{asset('css/menu-style.css')}}">
</head>
<body>
	<nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">Lập trình web 2015</a>
			</div>
	</nav>
	<div class="wrapper container-fluid">
		<div class="row">
			<div class="col-sm-2" id="sidebar">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Add item">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button">
							<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
						</button>
					</span>
				</div><!-- /input-group -->

				<div id="struct">
					<div class="menu">Menu 1<a href="" class="pull-right"><b>X</b></a></div>
					<div class="sub1">Sub 1<a href="" class="pull-right"><b>X</b></a></div>
					<div class="sub1">Sub 2<a href="" class="pull-right"><b>X</b></a></div>
					<div class="menu">Menu 2<a href="" class="pull-right"><b>X</b></a></div>
					<div class="menu">Menu 3<a href="" class="pull-right"><b>X</b></a></div>
					<div class="sub1">Sub 1<a href="" class="pull-right"><b>X</b></a></div>
					<div class="sub2">Sub sub 1<a href="" class="pull-right"><b>X</b></a></div>
					<div class="sub2">Sub sub 2<a href="" class="pull-right"><b>X</b></a></div>
				</div>
			</div>
			<div class="col-sm-10" id="content">
				<div class="row" id="editable">
					<div class="col-sm-2 edit-panel">
						<h4>Edit item</h4>
						<div class="form-horizontal">
							<div class="form-group">
								<label for="title">Title</label>
								<input type="text" id="title">
							</div>
							<div class="form-group">
								<label for="link">Link</label>
								<input type="text" id="link">
							</div>
						</div>
					</div>
					<div class="col-sm-1 edit-panel">
						<h4>Color</h4>
						<div>
							<input type="color" id="color-picker">
						</div>
					</div>
					<div class="col-sm-3 edit-panel">
						<h4>Menu setting</h4>
						<div class="form-horizontal">
							<div class="form-group">
								<label for="menu-font">Font-size</label>
								<input type="text" id="menu-font">
							</div>
							<div class="form-group">
								<label for="menu-color">Text color</label>
								<input type="color" id="menu-color">
								<label for="menu-hover">Text hover</label>
								<input type="color" id="menu-hover">
							</div>
						</div>
					</div>
					<div class="col-sm-5 edit-panel">
						<h4>Sub-menu setting</h4>
						<div class="form-horizontal">
							<div class="form-group">
								<label for="sub-font">Font-size</label>
								<input type="text" id="sub-font">
							</div>
							<div class="form-group">
								<label for="sub-color">Text color</label>
								<input type="color" id="sub-color">
								<label for="sub-hover">Text hover</label>
								<input type="color" id="sub-hover">
								<label for="sub-background">Background</label>
								<input type="color" id="sub-background">
							</div>
						</div>
					</div>
				</div>

				<div class="btn-group" role="group" aria-label="..." id="view">
					<button type="button" class="btn btn-primary">Preview</button>
					<button type="button" class="btn btn-primary">HTML</button>
					<button type="button" class="btn btn-primary">CSS</button>
					<button type="button" class="btn btn-primary">Javascript</button>
				</div>
				
				<div id="menu-bar">
					<div id='cssmenu'>
						<ul>
							<li class='active'><a href='index.html'>Home</a></li>
							<li class='has-sub'><a href='#'>Products</a>
								<ul>
									<li class='has-sub'><a href='#'>Product 1</a>
										<ul>
											<li><a href='#'>Sub Item</a></li>
											<li><a href='#'>Sub Item</a></li>
										</ul>
									</li>
									<li class='has-sub '><a href='#'>Product 2</a>
										<ul>
											<li><a href='#'>Sub Item</a></li>
											<li><a href='#'>Sub Item</a></li>
										</ul>
									</li>
								</ul>
							</li>
							<li><a href='#'>About</a></li>
							<li><a href='#'>Contact</a></li>
						</ul>
					</div>
				</div>
				
			</div>
		</div>
	</div>
	<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.2.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>