import Actuator from "./lib/animation/Actuator";
import {Bezier} from "./lib/animation/ticker";
import Linear from "./lib/animation/travel/Linear";
import {Vector} from "./lib/common";

const animation = new Actuator();
const ticker = new Bezier(0.1, 0.5, 0.4, 0.6, 6000);
animation.addTicker(ticker);
const travel = new Linear(Vector.create(0, 0), Vector.create(100, 0));
animation.addTravel(travel);

animation.addEventListener(event => {
    console.log('animation execution done: ', event)
});

animation.addStatusListener(status => {
    console.log('animation status change: ', status);
});

animation.vacillate();
