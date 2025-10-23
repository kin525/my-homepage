//锣计
function dms(z)
{
 d=(Math.floor(z))
 m=(Math.floor((z - (Math.floor(z))) * 60)) 
 s=(Math.floor(((((z - (Math.floor(z))) * 60) - (Math.floor((z - (Math.floor(z))) * 60))) * 60)*10+0.5))/10

if (s >= 60)
{s = s - 60 
m = m + 1}
 
if (m >= 60)
{m = m - 60
d = d + 1}

brg = d+(m/100)+(s/10000)
return brg}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>
//锣计+Code
function dmscode(z)
{
 d=(Math.floor(z))
 m=(Math.floor((z - (Math.floor(z))) * 60)) 
 s=(Math.floor(((((z - (Math.floor(z))) * 60) - (Math.floor((z - (Math.floor(z))) * 60))) * 60)*10+0.5))/10

if (s >= 60)
{s = s - 60 
m = m + 1}
 
if (m >= 60)
{m = m - 60
d = d + 1}

brg = d+"^"+m+"'"+s+"\""
return brg}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//计3
function fix3(z)
{return z=(Math.floor(z * 1000 + 0.5)) / 1000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//计4
function fix4(z)
{return z=(Math.floor(z * 10000 + 0.5)) / 10000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//计5
function fix5(z)
{return z=(Math.floor(z * 100000 + 0.5)) / 100000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//锣计
function deg(z)
{ return z=(Math.floor(z)) + (Math.floor((z - (Math.floor(z))) * 100)) / 60 + ((100 * z - (Math.floor(100 * z))) * 100) / 3600}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Sin Fucction
function fsin(z)
{return z=(Math.sin(z* 3.14159265358979/180))}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>



//cos Fucction
function fcos(z)
{return z=(Math.cos(z* 3.14159265358979/180))}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//璸2翴禯瞒
function jointdist(n,e,n2,e2)
{x = n2 - n
 y = e2 - e
dist = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
return dist}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//璸2翴brg
function joint(n,e,n2,e2)
{x = n2 - n + 1/100000000000
 y = e2 - e
 brg = (Math.atan(y / x))* 180 / 3.14159265358979
{if (x < 0)
(brg = brg + 180);
}
{if (brg < 0)
(brg = brg + 360);
}
return brg}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>
//絬璸CH
function linech(bn,be,bh,tb,nx,ex)

{pi = 3.14159265358979
tb1 = deg(tb)
             z = jointdist(bn,be,nx,ex)
            brg=joint(bn,be,nx,ex)
            aa = brg - tb1
            ch = fcos(aa) * z + fix3(bh)
return ch}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>




//絬璸OS
function lineos(bn,be,bh,tb,nx,ex)
{pi = 3.14159265358979
tb1 = deg(tb)
  
            z = jointdist(bn,be,nx,ex)
            brg=joint(bn,be,nx,ex)
            aa = brg - tb1
            os = fsin(aa) * z
return os}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Curve 璸Tan.Brg
function curvetb(bn,be,tb,r,bh,rh,ro)
{pi = 3.14159265358979
tb1 = deg(tb)
bb = tb1 + 90
cn = fcos(bb) * r + fix3(bn)
ce = fsin(bb) * r + fix3(be)
{if (r > 0)
(bb = bb + 180);
}
{if (bb > 360)
(bb = bb - 360);
}
rh = rh - fix3(bh)
aa = rh * 180 / pi / r
bb = bb + aa
nx = fcos(bb) * (Math.abs(r)) + cn
ex = fsin(bb) * (Math.abs(r)) + ce
tb2 = tb1 + aa
{if (tb2 < 0)
(tb2 = tb2 + 360);
}
{if (tb2 > 360)
(tb2 = tb2 - 360);
}
return tb2}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Curve 璸Nx
function curvenx(bn,be,tb,r,bh,rh,ro)
{pi = 3.14159265358979
tb1 = deg(tb)
bb = tb1 + 90
cn = fcos(bb) * r + fix3(bn)
ce = fsin(bb) * r + fix3(be)
{if (r > 0)
(bb = bb + 180);
}
{if (bb > 360)
(bb = bb - 360);
}
rh = rh - fix3(bh)
aa = rh * 180 / pi / r
bb = bb + aa
nx = fcos(bb) * (Math.abs(r)) + cn
ex = fsin(bb) * (Math.abs(r)) + ce
tb2 = tb1 + aa
{if (tb2 < 0)
(tb2 = tb2 + 360);
}
{if (tb2 > 360)
(tb2 = tb2 - 360);
}
aa = tb2 + 90
n= fcos(aa) * ro + nx
return n}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>



//Curve 璸Ex
function curveex(bn,be,tb,r,bh,rh,ro)
{pi = 3.14159265358979
tb1 = deg(tb)
bb = tb1 + 90
cn = fcos(bb) * r + fix3(bn)
ce = fsin(bb) * r + fix3(be)
{if (r > 0)
(bb = bb + 180);
}
{if (bb > 360)
(bb = bb - 360);
}
rh = rh - fix3(bh)
aa = rh * 180 / pi / r
bb = bb + aa
nx = fcos(bb) * (Math.abs(r)) + cn
ex = fsin(bb) * (Math.abs(r)) + ce
tb2 = tb1 + aa
{if (tb2 < 0)
(tb2 = tb2 + 360);
}
{if (tb2 > 360)
(tb2 = tb2 - 360);
}
aa = tb2 + 90
e= fsin(aa) * ro + ex
return e}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Curve 璸CH
function curvech(bn,be,tb,r,bh,nx,ex)
{pi = 3.14159265358979
 tb1 = deg(tb)
 bb = tb1 + 90
 cn = fcos(bb) * r + fix3(bn)
 ce = fsin(bb) * r + fix3(be)
{if (r > 0)
(bb = bb + 180);
}
{if (bb > 360)
(bb = bb - 360);
}
z = jointdist(cn,ce,nx,ex)
c = joint(cn,ce,nx,ex)
{if (r > 0)
(a1 = c - bb);
}            
{if (r < 0)
(a1 = bb - c);
}
{if (a1 < 0)
(a1 = a1 + 360);
}
l = a1 * pi * (Math.abs(r)) / 180
ch = l + fix3(bh)
{if (r < 0)
(os = z+r);
}            
{if (r > 0)
(os = r-z);
}
return ch}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//Curve 璸OS
function curveos(bn,be,tb,r,bh,nx,ex)
{pi = 3.14159265358979
 tb1 = deg(tb)
 bb = tb1 + 90
 cn = fcos(bb) * r + fix3(bn)
 ce = fsin(bb) * r + fix3(be)
{if (r > 0)
(bb = bb + 180);
}
{if (bb > 360)
(bb = bb - 360);
}
z = jointdist(cn,ce,nx,ex)
c = joint(cn,ce,nx,ex)
{if (r > 0)
(a1 = c - bb);
}            
{if (r < 0)
(a1 = bb - c);
}
{if (a1 < 0)
(a1 = a1 + 360);
}
l = a1 * pi * (Math.abs(r)) / 180
ch = l + fix3(bh)
{if (r < 0)
(os = fix3(z)+fix3(r));
}            
{if (r > 0)
(os = fix3(r)-fix3(z));
}
return os}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Spiral 璸N
function spiralnx(bh,bn,be,tb,r,spl,ch,os)
{bh=fix3(bh)
bn=fix5(bn)
be=fix5(be)
tb=fix5(tb)
r=fix3(r)
spl=fix3(spl)
ch=fix3(ch)
os=fix3(os)
pi = 3.14159265358979
tb1 = deg(tb)
l1=fix3(ch)-fix3(bh)
rl = spl*r
x = (Math.pow(l1,3))/(6*rl)-(Math.pow(l1,7))/(336*(Math.pow(rl,3)))+(Math.pow(l1,11))/(42240*(Math.pow(rl,5)))-(Math.pow(l1,15))/(9676800*(Math.pow(rl,7))) 
y = l1-(Math.pow(l1,5))/(40*(Math.pow(rl,2)))+(Math.pow(l1,9))/(3456*(Math.pow(rl,4)))-(Math.pow(l1,13))/(599040*(Math.pow(rl,6)))+(Math.pow(l1,17))/(175472640*(Math.pow(rl,8)))
nx = fix5(bn) + (y * fcos(tb1)) - (x * fsin(tb1))
ex = fix5(be) + (y * fsin(tb1)) + (x * fcos(tb1))
tb2 = (Math.pow(l1,2)) / (2 * r * spl) * 180 / pi + tb1
n = fix4(fcos(tb2+90)*os+fix5(nx))
return n}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Spiral 璸E
function spiralex(bh,bn,be,tb,r,spl,ch,os)
{bh=fix3(bh)
bn=fix5(bn)
be=fix5(be)
tb=fix5(tb)
r=fix3(r)
spl=fix3(spl)
ch=fix3(ch)
os=fix3(os)
pi = 3.14159265358979
tb1 = deg(tb)
l1=fix3(ch)-fix3(bh)
rl = spl*r
x = (Math.pow(l1,3))/(6*rl)-(Math.pow(l1,7))/(336*(Math.pow(rl,3)))+(Math.pow(l1,11))/(42240*(Math.pow(rl,5)))-(Math.pow(l1,15))/(9676800*(Math.pow(rl,7))) 
y = l1-(Math.pow(l1,5))/(40*(Math.pow(rl,2)))+(Math.pow(l1,9))/(3456*(Math.pow(rl,4)))-(Math.pow(l1,13))/(599040*(Math.pow(rl,6)))+(Math.pow(l1,17))/(175472640*(Math.pow(rl,8)))
nx = fix5(bn) + (y * fcos(tb1)) - (x * fsin(tb1))
ex = fix5(be) + (y * fsin(tb1)) + (x * fcos(tb1))
tb2 = (Math.pow(l1,2)) / (2 * r * spl) * 180 / pi + tb1
e = fix4(fsin(tb2+90)*os+fix5(ex))
return e}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//Spiral 璸 Tan.Brg
function spiralbrg(bh,bn,be,tb,r,spl,ch,os)
{bh=fix3(bh)
bn=fix5(bn)
be=fix5(be)
tb=fix5(tb)
r=fix3(r)
spl=fix3(spl)
ch=fix3(ch)
os=fix3(os)
pi = 3.14159265358979
tb1 = deg(tb)
l1=fix3(ch)-fix3(bh)
rl = spl*r
x = (Math.pow(l1,3))/(6*rl)-(Math.pow(l1,7))/(336*(Math.pow(rl,3)))+(Math.pow(l1,11))/(42240*(Math.pow(rl,5)))-(Math.pow(l1,15))/(9676800*(Math.pow(rl,7))) 
y = l1-(Math.pow(l1,5))/(40*(Math.pow(rl,2)))+(Math.pow(l1,9))/(3456*(Math.pow(rl,4)))-(Math.pow(l1,13))/(599040*(Math.pow(rl,6)))+(Math.pow(l1,17))/(175472640*(Math.pow(rl,8)))
nx = fix5(bn) + (y * fcos(tb1)) - (x * fsin(tb1))
ex = fix5(be) + (y * fsin(tb1)) + (x * fcos(tb1))
tb2 = (Math.pow(l1,2)) / (2 * r * spl) * 180 / pi + tb1
return tb2}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//----------- FUNCTION INPUT-------------------------------------

//Spiral 璸CH
function spiralch(bh,bn,be,tb,r,spl,n,e)
{
bh=fix3(bh)
bn=fix5(bn)
be=fix5(be)
tb=fix5(tb)
r=fix3(r)
spl=fix3(spl)
n=fix4(n)
e=fix4(e)
pi = 3.14159265358979
tb1 = deg(tb)
l1= 0.0001
var i=1
while (i<=100)
{
rl = spl*r
x = (Math.pow(l1,3))/(6*rl)-(Math.pow(l1,7))/(336*(Math.pow(rl,3)))+(Math.pow(l1,11))/(42240*(Math.pow(rl,5)))-(Math.pow(l1,15))/(9676800*(Math.pow(rl,7))) 
y = l1-(Math.pow(l1,5))/(40*(Math.pow(rl,2)))+(Math.pow(l1,9))/(3456*(Math.pow(rl,4)))-(Math.pow(l1,13))/(599040*(Math.pow(rl,6)))+(Math.pow(l1,17))/(175472640*(Math.pow(rl,8)))
nx = bn + (y * fcos(tb1)) - (x * fsin(tb1))
ex = be + (y * fsin(tb1)) + (x * fcos(tb1))
tb2 = (Math.pow(l1,2)) / (2 * r * spl) * 180 / pi + tb1

i=i+1
x = fix5(n - nx)
y = fix5(e - ex)
if (x == 0 && y == 0)
{
i=1000
}
else
{
z = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
c = atan2(x,y)
l1 = fcos(c - tb2) * z + l1
a3 = (Math.abs(fcos(c - tb2)))
}               
if (a3 < 0.0005)
{
i=1000
}
}  //End While
a4 = fsin(c - tb2)
ch = fix3(fix3(bh) + (spl / (Math.abs(spl))) * (Math.abs(l1)))
return ch}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Spiral 璸OS
function spiralos(bh,bn,be,tb,r,spl,n,e)
{
bh=fix3(bh)
bn=fix5(bn)
be=fix5(be)
tb=fix5(tb)
r=fix3(r)
spl=fix3(spl)
n=fix4(n)
e=fix4(e)
pi = 3.14159265358979
tb1 = deg(tb)
l1= 0.0001
var i=1
while (i<=100)
{
rl = spl*r
x = (Math.pow(l1,3))/(6*rl)-(Math.pow(l1,7))/(336*(Math.pow(rl,3)))+(Math.pow(l1,11))/(42240*(Math.pow(rl,5)))-(Math.pow(l1,15))/(9676800*(Math.pow(rl,7))) 
y = l1-(Math.pow(l1,5))/(40*(Math.pow(rl,2)))+(Math.pow(l1,9))/(3456*(Math.pow(rl,4)))-(Math.pow(l1,13))/(599040*(Math.pow(rl,6)))+(Math.pow(l1,17))/(175472640*(Math.pow(rl,8)))
nx = bn + (y * fcos(tb1)) - (x * fsin(tb1))
ex = be + (y * fsin(tb1)) + (x * fcos(tb1))
tb2 = (Math.pow(l1,2)) / (2 * r * spl) * 180 / pi + tb1

i=i+1
x = fix5(n - nx)
y = fix5(e - ex)
if (x == 0 && y == 0)
{
i=1000
}
else
{
z = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
c = atan2(x,y)
l1 = fcos(c - tb2) * z + l1
a3 = (Math.abs(fcos(c - tb2)))
}               
if (a3 < 0.0005)
{
i=1000
}
}  //End While
a4 = fsin(c - tb2)
ch = fix3(bh) + (spl / (Math.abs(spl))) * (Math.abs(l1))
os = fix3(a4/ (Math.abs(a4)) * z)
if(spl<0)
{
os = (Math.abs(os)*-1)
}
if (x == 0 && y == 0)
{
os=0
}
return os}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Spiral Check Brg
function spiralcheckbrg(bh,bn,be,tb,r,spl,n,e)
{
bh=fix3(bh)
bn=fix5(bn)
be=fix5(be)
tb=fix5(tb)
r=fix3(r)
spl=fix3(spl)
n=fix4(n)
e=fix4(e)
pi = 3.14159265358979
tb1 = deg(tb)
l1= 0.0001
var i=1
while (i<=100)
{
rl = spl*r
x = (Math.pow(l1,3))/(6*rl)-(Math.pow(l1,7))/(336*(Math.pow(rl,3)))+(Math.pow(l1,11))/(42240*(Math.pow(rl,5)))-(Math.pow(l1,15))/(9676800*(Math.pow(rl,7))) 
y = l1-(Math.pow(l1,5))/(40*(Math.pow(rl,2)))+(Math.pow(l1,9))/(3456*(Math.pow(rl,4)))-(Math.pow(l1,13))/(599040*(Math.pow(rl,6)))+(Math.pow(l1,17))/(175472640*(Math.pow(rl,8)))
nx = bn + (y * fcos(tb1)) - (x * fsin(tb1))
ex = be + (y * fsin(tb1)) + (x * fcos(tb1))
tb2 = (Math.pow(l1,2)) / (2 * r * spl) * 180 / pi + tb1

i=i+1
x = fix5(n - nx)
y = fix5(e - ex)
if (x == 0 && y == 0)
{
i=1000
}
else
{
z = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
c = atan2(x,y)
l1 = fcos(c - tb2) * z + l1
a3 = (Math.abs(fcos(c - tb2)))
}               
if (a3 < 0.0005)
{
i=1000
}
}  //End While
return tb2}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//絬璸Nx
function linenx(bn,be,bh,tb,rh,ro)
{pi = 3.14159265358979
 tb1 = deg(tb)
 rh = rh - fix3(bh)
 d = (Math.sqrt((rh*rh) + (ro*ro)))
 c = (Math.atan(ro / rh)) * 180 / pi
 {if (rh < 0)
(c = c + 180);
}
{if (c < 0)
(c = c + 360);
}
bb = c + tb1
nx = fcos(bb) *d+fix3(bn)
return nx}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>




//絬璸Ex
function lineex(bn,be,bh,tb,rh,ro)
{pi = 3.14159265358979
tb1 = deg(tb)
rh = fix3(rh) - fix3(bh)
d = (Math.sqrt((rh*rh) + (ro*ro)))
c = (Math.atan(ro / rh)) * 180 / pi
{if (rh < 0)
(c = c + 180);
}
{if (c < 0)
(c = c + 360);
}
bb = c + tb1
ex = fsin(bb) *d+fix3(be)
return ex}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//tan Fucction
function ftan(z)
{return z=(Math.tan(z* 3.14159265358979/180))}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//ATAN2
function atan2(x,y)
{ x = x + 1/100000000000
brg = (Math.atan(y / x))* 180 / 3.14159265358979
{if (x < 0)
(brg = brg + 180);
}

{if (brg < 0)
(brg = brg + 360);
}
return brg}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>