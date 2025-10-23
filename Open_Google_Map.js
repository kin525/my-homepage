function ChangeLL(Nx,Ex)
{

a9 = Nx
b9 = Ex
e9 = (1.0000001619) * a9 - (0.000027858) * b9 + (23.098979)
f9 = 0.000027858 * a9 + 1.0000001619 * b9 - 23.149125
g9 = e9 - (819069.8)
h9 = f9 - (836694.05)
i9 = g9 + (2468194.2615)
j9 = 0.3934212602

l9 = i9 / 6378137 / (0.998324298453)
k9 = 6378137 * ((0.998324298453) * l9 - (0.002514607061) * Math.sin(2 * l9) + (0.000002639047) * Math.sin(4 * l9) - (0.000000003418) * Math.sin(6 * l9))


n9 = l9 + Math.sin((i9 - k9) / 6378137)
m9 = 6378137 * ((0.998324298453) * n9 - (0.002514607061) * Math.sin(2 * n9) + (0.000002639047) * Math.sin(4 * n9) - (0.000000003418) * Math.sin(6 * n9))

p9 = n9 + Math.sin((i9 - m9) / 6378137)
o9 = 6378137 * ((0.998324298453) * p9 - (0.002514607061) * Math.sin(2 * p9) + (0.000002639047) * Math.sin(4 * p9) - (0.000000003418) * Math.sin(6 * p9))

r9 = p9 + Math.sin((i9 - o9) / 6378137)
q9 = 6378137 * ((0.998324298453) * r9 - (0.002514607061) * Math.sin(2 * r9) + (0.000002639047) * Math.sin(4 * r9) - (0.000000003418) * Math.sin(6 * r9))

t9 = r9 + Math.sin((i9 - q9) / 6378137)
s9 = 6378137 * ((0.998324298453) * t9 - (0.002514607061) * Math.sin(2 * t9) + (0.000002639047) * Math.sin(4 * t9) - (0.000000003418) * Math.sin(6 * t9))

v9 = t9 + Math.sin((i9 - s9) / 6378137)
u9 = 6378137 * ((0.998324298453) * v9 - (0.002514607061) * Math.sin(2 * v9) + (0.000002639047) * Math.sin(4 * v9) - (0.000000003418) * Math.sin(6 * v9))
x9 = v9 + Math.sin((i9 - u9) / 6378137)

y9 = Math.tan(x9)

z9 = 6378137 * (1 - (0.00669437999)) / Math.pow((1 - (0.00669437999) * Math.pow(Math.sin(x9),2)),1.5)

aa9 = 6378137 / Math.pow((1 - (0.00669437999) * Math.pow(Math.sin(x9),2)),0.5)



ab9 = aa9 / z9

Latitude = (x9 - (y9 / z9) * (Math.pow(h9, 2) / 2 / aa9) + (y9 / z9) * (Math.pow(h9 , 4) / 24 / Math.pow(aa9 , 3)) * (-4 * Math.pow(ab9 , 2) + 9 * ab9 * (1 - Math.pow(y9 , 2)) + 12 * Math.pow(y9 , 2))) * 180 / 3.14159265358979
//document.write(Latitude)

Longitude = ((1.9928346356) + 1 / Math.cos(x9) * (h9 / aa9) - 1 / 1 * (Math.pow(h9 , 3) / 6 / Math.pow(aa9 , 3)) * (ab9 + 2 * Math.pow(y9 , 2))) * 180 / 3.14159265358979

//document.write(Longitude)

mapdata="https://maps.google.com.hk/maps?q="+Latitude+","+Longitude

window.open(mapdata)

return 
}