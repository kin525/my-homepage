//���u�pCH
function linech(bn, be, bh, tb, nx, ex)
{
bn = fix4(bn)
be = fix4(be)
bh = fix3(bh)
nx = fix4(nx)
ex = fix4(ex)




pi = 3.14159265358979
tb1 = deg(tb)
  
            x = nx - bn
            y = ex - be
            z = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
            brg=joint(bn,be,nx,ex)
            aa = brg - tb1
            ch = fcos(aa) * z + bh
            os = fsin(aa) * z
return ch}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>















//�p�ƫ�4��
function fix4(z)
{return z=(Math.floor(z * 10000 + 0.5)) / 10000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>
//��p��
function deg(z)
{ return z=(Math.floor(z)) + (Math.floor((z - (Math.floor(z))) * 100)) / 60 + ((100 * z - (Math.floor(100 * z))) * 100) / 3600}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//�p�ƫ�3��
function fix3(z)
{return z=(Math.floor(z * 1000 + 0.5)) / 1000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//�p2�Ibrg
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



//�p2�I�Z��
function jointdist(n,e,n2,e2)
{x = n2 - n
 y = e2 - e
dist = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
return dist}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//��׼�+Code
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

//��׼�
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

//Sin Fucction
function fsin(z)
{return z=(Math.sin(z* 3.14159265358979/180))}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>



//cos Fucction
function fcos(z)
{return z=(Math.cos(z* 3.14159265358979/180))}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>





//tan Fucction
function ftan(z)
{return z=(Math.tan(z* 3.14159265358979/180))}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//���u�pNx
function linenx(bn,be,bh,tb,rh,ro)
{
bn=fix4(bn)
be=fix4(be)
bh=fix3(bh)
rh=fix3(rh)
ro=fix3(ro)



pi = 3.14159265358979
 tb1 = deg(tb)
 rh = rh - bh
 d = (Math.sqrt((rh*rh) + (ro*ro)))
 c = (Math.atan(ro / rh)) * 180 / pi
 {if (rh < 0)
(c = c + 180);
}
{if (c < 0)
(c = c + 360);
}
bb = c + tb1
nx = fcos(bb) *d+bn
ex = fsin(bb) *d+be
return nx}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>