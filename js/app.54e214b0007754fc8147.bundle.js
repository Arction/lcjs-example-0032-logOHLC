(self.webpackChunk=self.webpackChunk||[]).push([[143],{138:(e,t,a)=>{const s=a(809),{lightningChart:i,OHLCSeriesTypes:r,AxisTickStrategies:n,LegendBoxBuilders:o,Themes:m}=s,{createProgressiveTraceGenerator:c}=a(27),h=i().ChartXY({defaultAxisY:{type:"logarithmic",base:"10"}}).setTitle("OHLC Chart with Logarithmic Y Axis"),d=new Date(2013,8,16),u=h.getDefaultAxisX().setTickStrategy(n.DateTime,(e=>e.setDateOrigin(d))),x=(h.getDefaultAxisY().setTitle("Stock price (€)"),1e3*(.5+Math.random())),g=1e4*(.5+Math.random());Promise.all([c().setNumberOfPoints(15e3).generate().toPromise().then((e=>e.map((e=>({x:e.x,y:Math.max(x+6*e.y,1)}))))),c().setNumberOfPoints(15e3).generate().toPromise().then((e=>e.map((e=>{return{x:e.x,y:g+(t=.75*g,a=250*e.y,a<t?t+(t-a):a)};var t,a}))))]).then((e=>e[0].map(((t,a)=>{if(a<=3216)return t;if(a>=5796)return e[1][a];const s=(a-3216)/2580;return{x:t.x,y:t.y+s*(e[1][a].y-t.y)}})))).then((e=>e.map((e=>({x:1e3*e.x*60*60,y:e.y}))))).then((e=>{h.addOHLCSeries({seriesConstructor:r.AutomaticPacking}).setName("Stock price").setPackingResolution(36e5).add(e),u.addConstantLine().setName("Price boom start").setValue(115776e5).setMouseInteractions(!1),u.fit(),h.addLegendBox(o.VerticalLegendBox).setAutoDispose({type:"max-width",maxWidth:.2}).add(h)}))}},e=>{e.O(0,[736],(()=>(138,e(e.s=138)))),e.O()}]);