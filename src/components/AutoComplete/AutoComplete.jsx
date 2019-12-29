import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { setCity, setCityDetails } from '../../actions'

const styles = (theme) => ({
  autoComplete: {
    width: 300,
    margin: '30px auto',
    [theme.breakpoints.down('sm')]: {
      width: 220,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 300,
    },
    '& > div': {
      '& > label': {
        color: 'white',
      },
      '& > div': {
        border: '1px solid white',
        borderRadius: 10,
        color: 'white',
        '&:focused': {
          border: 'none',
        },
      },
    },
  },
})

function AutoComplete(props) {
  const { classes } = props
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [autoCompleteOptions, setCities] = useState('')
  const loading = open && options.length === 0

  async function handleSeachwordChanged(e, value) {
    if (value.length < 2 && open) {
      return setOpen(false)
    }
    if (!open) {
      setOpen(true)
    }
    try {
      // const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=awM6pDci3i4lGcDFhVGHqPMLgeAYIehb&q=${value}`)
      // const cities = await response.json()
      setErrorMsg('')
      const cities = JSON.parse('[{"Version":1,"Key":"354547","Type":"City","Rank":75,"LocalizedName":"Asdas","Country":{"ID":"YE","LocalizedName":"Yemen"},"AdministrativeArea":{"ID":"MA","LocalizedName":"Ma’rib"}},{"Version":1,"Key":"3352828","Type":"City","Rank":85,"LocalizedName":"Asdrúbal","Country":{"ID":"ES","LocalizedName":"Spain"},"AdministrativeArea":{"ID":"AN","LocalizedName":"Andalusia"}},{"Version":1,"Key":"3219290","Type":"City","Rank":85,"LocalizedName":"Asdharpur","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"BR","LocalizedName":"Bihar"}},{"Version":1,"Key":"3262177","Type":"City","Rank":85,"LocalizedName":"Asdhir","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"JH","LocalizedName":"Jharkhand"}},{"Version":1,"Key":"3134289","Type":"City","Rank":85,"LocalizedName":"Asdeomai Nurpur","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"UP","LocalizedName":"Uttar Pradesh"}},{"Version":1,"Key":"3145861","Type":"City","Rank":85,"LocalizedName":"Asdha","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"UP","LocalizedName":"Uttar Pradesh"}},{"Version":1,"Key":"2074447","Type":"City","Rank":85,"LocalizedName":"Asdharmai","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"UP","LocalizedName":"Uttar Pradesh"}},{"Version":1,"Key":"3289855","Type":"City","Rank":85,"LocalizedName":"Asdhirpur","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"UP","LocalizedName":"Uttar Pradesh"}},{"Version":1,"Key":"3113147","Type":"City","Rank":85,"LocalizedName":"Asdulla Pur Kal1An","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"UP","LocalizedName":"Uttar Pradesh"}},{"Version":1,"Key":"2885717","Type":"City","Rank":85,"LocalizedName":"Asda Dakshin","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"WB","LocalizedName":"West Bengal"}}]')
      setCities(cities)
      setOptions(cities.map((city) => ({ label: city.LocalizedName, key: city.Key })))
    }
    catch (e) {
      setErrorMsg('Unable to fetch results')
    }
  }

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      className={classes.autoComplete}
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      onChange={(e, value) => {
        props.setCity(value || {})
        if (value) {
          const country = autoCompleteOptions.filter((city) => value.key === city.Key)
          props.setCityDetails('country', country[0].Country.LocalizedName)
        }
      }}
      onInputChange={handleSeachwordChanged}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label="Search city"
          fullWidth
          variant="outlined"
          helperText={errorMsg || ' '}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default compose(
  connect(null, { setCity, setCityDetails }),
  withStyles(styles),
)(AutoComplete)
