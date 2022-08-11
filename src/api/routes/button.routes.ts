import customExpress from '../../lib/customExpress/customExpress';
import Controller from '../controller';
import ButtonController from '../controllers/button.ctrl';
import authCheck from '../mdw/authCheck';
import ListButtonsRequest from '../schema/ListButtonsRequest';
import PlayButtonSoundRequest from '../schema/PlayButtonSoundRequest';
import UpdateButtonRequest from '../schema/UpdateButtonRequest';

const app = customExpress();

app.get('/',
    authCheck,
    Controller.validate(ListButtonsRequest),
    Controller.run(ButtonController.getButtons),
);

app.put('/:id',
    authCheck,
    Controller.validate(UpdateButtonRequest),
    Controller.run(ButtonController.updateButton),
);

app.post('/:id',
    authCheck,
    Controller.validate(PlayButtonSoundRequest),
    Controller.run(ButtonController.playButtonSound),
);

export default app;
