//锣计
function deg(z)
{ return z=(Math.floor(z)) + (Math.floor((z - (Math.floor(z))) * 100)) / 60 + ((100 * z - (Math.floor(100 * z))) * 100) / 3600}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>
//计4
function fix4(z)
{return z=(Math.floor(z * 10000 + 0.5)) / 10000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//计5
function fix5(z)
{return z=(Math.floor(z * 100000 + 0.5)) / 100000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>
//计3
function fix3(z)
{return z=(Math.floor(z * 1000 + 0.5)) / 1000}
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

// Sinsection
function sinsection(yn,ye,brg,va,sd,zn,ze,bsb)
{
yn=fix4(yn)
ye=fix4(ye)
brg=fix5(brg)
va=fix5(va)
sd=fix3(sd)
zn=fix4(zn)
ze=fix4(ze)
pi = 3.14159265358979
brg = deg(brg)
va = deg(va)
hd = Math.abs(fsin(va)) * sd
bsb = deg(bsb)
dy = joint(yn,ye,zn,ze)
dx = jointdist(yn,ye,zn,ze)
aa = brg - bsb
if (aa < 0)
{
aa = aa + 360
}
ab = (Math.asin(hd / (dx / fsin(aa))))*180/pi
ac = 180 - ab - aa
ad = dy - ac
nx = fix4(fcos(ad) * hd + fix4(yn))
ex = fix4(fsin(ad) * hd + fix4(ye))
return nx}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>





// Sinsection COLL
function sinsectioncoll(yl,va,sd,ph)
{
yl=fix4(yl)
va=fix5(va)
sd=fix3(sd)
ph=fix4(ph)
va = deg(va)
vd = (fcos(va)) * sd *(-1)
coll = fix3(vd) + fix3(ph) + fix3(yl)

return coll}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//Sin Fucction
function fsin(z)
{return z=(Math.sin(z* 3.14159265358979/180))}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>



//cos Fucction
function fcos(z)
{return z=(Math.cos(z* 3.14159265358979/180))}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// Resection
function Resection(n1,e1,brg1,n2,e2,brg2,n3,e3,brg3)
{
pi = 3.14159265358979
M7=joint(n1,e1,n2,e2)
M8=joint(n2,e2,n3,e3)
M9=joint(n3,e3,n1,e1)
N7=M9+180-M7
N8=M7+180-M8
N9=M8+180-M9
O7=1/(Math.tan(N7*pi/180))
O8=1/(Math.tan(N8*pi/180))
O9=1/(Math.tan(N9*pi/180))
P7=deg(brg1)
P8=deg(brg2)
P9=deg(brg3)
Q7=P8-P7
Q8=P9-P8
Q9=P7-P9
R7=1/(Math.tan(Q7*pi/180))
R8=1/(Math.tan(Q8*pi/180))
R9=1/(Math.tan(Q9*pi/180))
S7=1/(O7-R8)
S8=1/(O8-R9)
S9=1/(O9-R7)

nx=((n1*S7)+(n2*S8)+(n3*S9))/(S7+S8+S9)
ex=((e1*S7)+(e2*S8)+(e3*S9))/(S7+S8+S9)

return nx}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>




