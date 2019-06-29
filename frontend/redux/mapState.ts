export default function mapStateToProps(state: any) {
    return {
      search: state.search,
      update: state.update,
      fetch_data: state.fetch_data
    }
}