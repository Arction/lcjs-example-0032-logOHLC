(self.webpackChunk=self.webpackChunk||[]).push([[143],{138:(e,t,a)=>{const i=a(475),s=a(27),{lightningChart:r,OHLCSeriesTypes:n,AxisTickStrategies:o,LegendBoxBuilders:m,Themes:h}=i,{createProgressiveTraceGenerator:c}=s,x=r().ChartXY({defaultAxisY:{type:"logarithmic",base:"10"}}).setTitle("OHLC Chart with Logarithmic Y Axis"),d=new Date(2013,8,16),u=d.getTime(),g=x.getDefaultAxisX().setTickStrategy(o.DateTime,(e=>e.setDateOrigin(d))),y=(x.getDefaultAxisY().setTitle("Stock price (€)"),1e3*(.5+Math.random())),l=1e4*(.5+Math.random());Promise.all([c().setNumberOfPoints(15e3).generate().toPromise().then((e=>e.map((e=>({x:e.x,y:Math.max(y+6*e.y,1)}))))),c().setNumberOfPoints(15e3).generate().toPromise().then((e=>e.map((e=>{return{x:e.x,y:l+(t=.75*l,a=250*e.y,a<t?t+(t-a):a)};var t,a}))))]).then((e=>e[0].map(((t,a)=>{if(a<=3216)return t;if(a>=5796)return e[1][a];const i=(a-3216)/2580;return{x:t.x,y:t.y+i*(e[1][a].y-t.y)}})))).then((e=>e.map((e=>({x:u+1e3*e.x*60*60,y:e.y}))))).then((e=>e.map((e=>({x:e.x-u,y:e.y}))))).then((e=>{x.addOHLCSeries({seriesConstructor:n.AutomaticPacking}).setName("Stock price").setPackingResolution(36e5).add(e),g.addConstantLine().setName("Price boom start").setValue(115776e5).setMouseInteractions(!1),g.fit(),x.addLegendBox(m.VerticalLegendBox).setAutoDispose({type:"max-width",maxWidth:.2}).add(x)}))}},e=>{e.O(0,[736],(()=>(138,e(e.s=138)))),e.O()}]);