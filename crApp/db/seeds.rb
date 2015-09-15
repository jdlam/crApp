# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

bathroom_list = [
  ['100% Playground','Glenwood Rd & E 101st St','Brooklyn','NY','11236','40.647122','-73.899261'],
  ['174th Street Playground','East 174 Street & Stratford Avenue','Bronx','NY','10472','40.833881','-73.876587'],
  ['227 Street Playground','Bronx Boulevard & East 227th St','Bronx','NY','10467','40.888303','-73.856808'],
  ['Abe Lincoln','60 E 135th St','New York','NY','10037','40.811341','-73.935378'],
  ['Abigail Playground','E 156 St bet. Tinton Av and Union Av Bronx','Bronx','NY','10455','40.822451','-73.901956'],
  ['Albemarle Park','Albermarle Road & Dahill Road','Brooklyn','NY','11218','40.644991','-73.980915'],
  ['Albert J. Parham Playground','Adelphi Street & DeKalb avenue','Brooklyn','NY','11205','40.689563','-73.971143'],
  ['Alexander Hamilton Playground','Hamilton Place & West 141 street','New York','NY','10031','40.823142','-73.950501'],
  ['Alice Kornegay Triangle','Lexington Avenue & East 129 street','New York','NY','10035','40.806924','-73.935578'],
  ['Alley Park (PS 213)','67 Avenue & 230 Street','Queens','NY','11364','40.747462','-73.746773'],
  ['Alstyne Playground','Alystine Avenue & 102 Street','Queen','NY','11368','40.743567','-73.861842'],
  ['American Playground','389 Milton St','Brooklyn','NY','11222','40.558257','-74.110274'],
  ['Ampere Playground (PS 64)','101 Avenue & 82 Street','Queens','NY','11416','40.681128','-73.857049']
]

bathroom_list.each do |name, address, city, state, zip_code, lat, long|
  Bathroom.create({name: name, address: address, city: city, state: state, zip_code: zip_code, latitude: lat, longitude: long})
end
