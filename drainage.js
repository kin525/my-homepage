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



//�p�ƫ�3��
function fix3(z)
{return z=(Math.floor(z * 1000 + 0.5)) / 1000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>


//�p�ƫ�4��
function fix4(z)
{return z=(Math.floor(z * 10000 + 0.5)) / 10000}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

//��p��
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

//�p2�I�Z��
function jointdist(n,e,n2,e2)
{x = n2 - n
 y = e2 - e
dist = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
return dist}
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
//���u�pCH
function linech(bn, be, bh, tb, nx, ex)
{pi = 3.14159265358979
tb1 = deg(tb)
  
            x = nx - bn
            y = ex - be
            z = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
            brg=joint(bn,be,nx,ex)
            aa = brg - tb1
            ch = fcos(aa) * z + bh
return ch}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>




//���u�pOS
function lineos(bn, be, bh, tb, nx, ex)
{pi = 3.14159265358979
tb1 = deg(tb)
  
            x = nx - bn
            y = ex - be
            z = (Math.sqrt((Math.pow(x,2)) + (Math.pow(y,2))))
            brg=joint(bn,be,nx,ex)
            aa = brg - tb1
            os = fsin(aa) * z
return os}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>