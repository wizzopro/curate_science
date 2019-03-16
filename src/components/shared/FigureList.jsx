import React from 'react';
import PropTypes from 'prop-types';

import {TextField, Button, Icon, Typography, Menu, Grid, InputLabel,
	FormControl, Select, OutlinedInput, InputBase, Tooltip} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    container: {
       display: 'flex',
       flexDirection: 'row',
       overflow: 'scroll-x'
    },
    thumbnail: {
        display: 'inline-block',
        width: 110,
        height: 110,
        marginRight: 10,
        marginTop: 10,
        border: '1px solid gray',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        borderRadius: 3,
        textAlign: 'center'
    },
    add: {
        width: 110,
        height: 110,
        display: 'inline-block',
        paddingTop: 30,
        color: 'black'
    }
}

class FigureList extends React.Component {
	constructor(props) {
        super(props);
        this.state = {}
        this.delete_figure = this.delete_figure.bind(this)
        this.render_thumbnail = this.render_thumbnail.bind(this)
        this.handle_add = this.handle_add.bind(this)
    }

    delete_figure = idx => event => {
        if (this.props.onDelete != null) this.props.onDelete(idx)
    }

    figure_click = idx => event => {
        let {figures, showDelete} = this.props
        if (showDelete) this.delete_figure(idx)
        else this.props.onFigureClick(figures[idx])
    }

    handle_add() {
        this.props.onAdd()
    }

    render_thumbnail(kf, i) {
        let {classes, showDelete} = this.props
        let kind = kf.is_table ? 'Table' : 'Figure'
        let img = (
            <img key={i}
                  className={classes.thumbnail}
                  style={{backgroundImage: `url(${kf.image})`}} />
        )
        let tooltip = showDelete ? "Delete figure" : "Enlarge figure"
        return <Tooltip title={tooltip} key={i}><a key={i} href="javascript:void(0)" onClick={this.figure_click(i)}>{ img }</a></Tooltip>
    }

	render() {
		let {classes, figures, showAdd} = this.props
        let addButton
        if (figures == null) figures = []
        if (showAdd) addButton = <a href="javascript:void(0)" onClick={this.handle_add} className={classes.thumbnail}>
            <span className={classes.add}>
                <Icon fontSize='large'>add</Icon> <Typography>Add</Typography>
            </span>
        </a>
		return (
			<div className={classes.container}>
				{ figures.map(this.render_thumbnail) }
                { addButton }
            </div>
        )
	}
}

FigureList.propTypes = {
    onDelete: PropTypes.func,
    showDelete: PropTypes.bool,
    showAdd: PropTypes.bool
}

FigureList.defaultProps = {
	figures: [],
    showDelete: false,
    showAdd: false
};

export default withStyles(styles)(FigureList);