export default function mapStateToProps(state: any) {
    return {
      search: state.search,
      update: state.update,
      update_key: state.update_key,
      fetch_data: state.fetch_data
    }
}