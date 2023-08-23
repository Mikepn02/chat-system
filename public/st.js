$(`<style>
.nav-stacked>li {
float: none;
background: url(/imgs/bg.jpg);
overflow: auto;
background-size: cover;
background-repeat: no-repeat;
background-position: revert;
padding: 9px;
border: 0px!important;
width: 147px;
}
.nav-pills>li>a {
background: rgba(0,0,0,0.2)!important;
color: #fff!important;
width: 111px;
border-radius: 0px!important;
list-style: none;
padding: 10px!important;
height: 32px;
}
.ico_pl::before {
color: #fff!important;
background: #000!important;
padding: 9px;
margin: -5px 21px 0px -9px !important;
position: unset;
}
#m1 {
width: 150px;
height: 100%;
}
#fpsearch, .banit2 ,#loginsearch,.banit{
border: 1px solid #aaa;
border-radius: 3px;
padding: 5px;
background-color: transparent;
border-radius: 0px!important;
height: 40px;
margin: 1px 0 0 0;
}
th {
background-color: #6495ed;
color: #fff;
padding: 5px;
font-family: serif;
font-size: 15px!important;
border-radius: 0px!important;
padding: 16px 18px;
border-bottom: 1px solid #000!important;
}
td {
font-weight: 700;
padding: 8px 10px;
font: icon;
font-size: 13px!important;
border-top: 1px solid #ddd;
border-right: 1px solid #ddd;
box-sizing: content-box;
border: 1px solid rgb(235 235 235)!important;
}
.nav-stacked>li+li {
margin-top: 0px;
margin-left: 0;
padding: 4px;

}
#subs .btn.btn-primary.fa.fa-times {
background: #d43f3a;
border: 1px solid #d43f3a;
}
.fa-toggle-on:before {
float: inherit;
}
.btn-danger {
border-color: #d43f3a!important;
background: #d43f3a!important;
}
.fa-trash:before {
float: left;
}
#hostin input{
border-radius: 0px!important;
border: 1px solid #919191;
padding: 5px;

}
button.btn {
margin: 0 0 4px 2px !important;
color: #fff!important;
border: 0px!important;
height: 34px!important;
font-size: 14px!important;
border-radius: 0px!important;
text-align: center!important;
}
.btn-success {
background: #29b12f!important;
width: 80px;

}
.checkbox-inline, .radio-inline{
position: relative;
display: inline-block;
padding-left: 20px;
margin-bottom: 0;
font-weight: 400;
vertical-align: middle;
cursor: pointer;
font: initial;
font-size: 14px!important;
padding: 5px 31px;
}
#fps .fa-check{
width: 48px; 
height: 36px;
padding: 10px 13px;
}
#bots  button ,#bots input,#bots  select, #bots textarea{
height: 33px;
border: 1px solid #cdcaca;
}
.label-primary {
font-size: 15px!important;
color: #fff;
font: icon;
margin: 0px 2px 2px 0;
border: 1px solid;

}
#logins .fa-gear {
height: 38px;
width: 56px;
padding: 10px 19px;
background: #5cb85c;
border-color: #5cb85c;
}
.fl {
float: left;
font: icon;
font-size: 14px!important;
}

.dots {
display: inline-block;
white-space: nowrap;
overflow: hidden !important;
text-overflow: ellipsis;
max-width: 100%;
border-radius: 0px;
padding: 1px 0px 6px 0px;
border: 1px solid #999696;
margin: 5px 2px 6px 5px;
}
#sett b {
font-weight: 700;
font: icon;
font-size: 15px!important;
}
#sett textarea {
overflow: auto;
max-width: 100%;
border-radius: 0px;
padding: 1px 0px 6px 0px;
border: 1px solid #999696;
margin: 5px 2px 6px 5px;
height: 88px!important;
width: 337px!important;
}
#sett button, input, select, textarea{
font: icon;
font-size: 16px!important;
}
#bnrat .fa.fa-times {
height: 34px;
width: 33px;
padding: 9px!important;
}

#bans td {
font-weight: 700;
padding: 8px 10px;
font: inherit;
font-size: 13px!important;
border-top: 1px solid #ddd;
border-right: 1px solid #ddd;
box-sizing: content-box;
border: 1px solid hwb(0deg 90% 10%)!important;
color: #353535;
}
#rooms .fa-times.m {
position: absolute;
margin: 0 0 0 143px!important;
background: #f0ad4e!important;
border: 1px solid #f0ad4e!important;
height: 36px;
width: 42px;
}
#rooms .fa.fa-check {
position: absolute;
margin: 0 0 0 250px!important;
background: #5cb85c!important;
border: 1px solid #5cb85c!important;
height: 36px;
width: 42px;
}
#rooms .fa-times.r {
position: absolute;
margin: 0px 0 0 314px!important;
background: #d9534f!important;
border: 1px solid #d9534f!important;
height: 36px;
width: 92px;
padding: 9px;
}
#rooms .fa-times.t {
position: absolute;
margin: 0 0 0 435px!important;
background: #d9534f!important;
border: 1px solid #d9534f!important;
height: 36px;
width: 42px;
}
#rooms .fa.fa-photo {
margin: 19px 0px 0 35px!important;
position: absolute;
background: #1caad5!important;
border: 1px solid #1caad5!important;
height: 36px;
width: 77px;
text-align: center;
}

#rooms .fa-photo:before, .fa-image:before, .fa-picture-o:before {
content: "\f03e";
float: left;
}

#rooms img{
width: 50px;
height: 50px;
border-radius: 25px;
margin: 10px 0 0 0;
}
#rooms .table>tbody>tr>td, .table>thead>tr>th{
	min-width: 0px!important;
	border-radius: 25px!important;
}

#bots .btn-success {
font: icon;
font-size: 16px!important;
}
#bans .btn-success{
font: icon;
font-size: 16px!important;
margin: 13px 0px 0px 0px!important;
}
.nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active>a:hover {
color: #fff;
background-color: #428dce!important;
}
#rooms .border.corner.header {
min-width: 93px;
}
.label-primary{
background-color: #c5c5c5;
color: #000!important;
border: 1px solid #aeaeae!important;
margin: 10px 2px 0px 0px !important;
}
#logins .fa-gear{
height: 38px;
width: 56px;
padding: 10px 19px;
background: #5cb85c;
border-color: #5cb85c;
}
.fa-chain:before, .fa-link:before,.fa-photo:before, .fa-image:before, .fa-picture-o:before{
display:none!important


}
#rooms .fa-photo::before{

display:block!important
}
#bots .fa.fa-comments {
height: 30px!important;
width: 56px;
padding: 7px 18px;
background: #4bc84b;
border: 0px;
}

#bots .btn-info {
height: 30px!important;
width: 96px;
padding: 7px 18px;
background: #5bc0de;
border: 0px;
border-radius: 0px;
}

.pop.corner .form-control{height: 40px!important;border-radius: 0px!important;border: 1px solid #ddd!important;}

.pop.corner .fa.fa-save{
width: 54px!important;
background: #5cb85c!important;
 }
 </style>`).insertBefore('body');