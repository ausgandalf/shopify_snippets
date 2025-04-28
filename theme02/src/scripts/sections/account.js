
const selectors = {
    customerLoginPage: '.customer-login',
    customerNavigationMobile: '[data-account-navigation-mobile]',
    savedAddressBlock: '[data-saved-addresses]',
    addressListView: '[data-address-list-view]',
    addressEditView: '[data-address-edit-view]',
    addressAddView: '[data-address-add-view]',
    pagination: '.pagination'
}

const dom = {}

const cacheDom = () => {
    dom.customerLoginPage = document.querySelector(selectors.customerLoginPage);
    dom.customerNavigationMobile = document.querySelector(selectors.customerNavigationMobile);
    dom.savedAddressBlock = document.querySelector(selectors.savedAddressBlock);
    dom.addressListView = document.querySelector(selectors.addressListView);
    dom.addressEditView = document.querySelector(selectors.addressEditView);
    dom.addressAddView = document.querySelector(selectors.addressAddView);
    dom.pagination = document.querySelector(selectors.pagination);
}

const recoverAccountToggle = () => {
    if (dom.customerLoginPage) {
        const recoverForm = dom.customerLoginPage.querySelector('[data-reset-form]');
        const loginForm = dom.customerLoginPage.querySelector('[data-login-form]');
        const recoverAccountToggle = dom.customerLoginPage.querySelector('[data-recover-toggle]');
        const loginAccountToggle = dom.customerLoginPage.querySelector('[data-login-toggle]');

        if (window.location.href.includes('#recover') || recoverAccountToggle.classList.contains('active')) {
            recoverForm.style.display = 'flex';
            loginForm.style.display = 'none';
        } else {
            recoverForm.style.display = 'none';
            loginForm.style.display = 'flex';
        }

        recoverAccountToggle.addEventListener('click', (event) => {
            event.preventDefault();
            recoverForm.style.display = 'flex';
            loginForm.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });

        });

        loginAccountToggle.addEventListener('click', (event) => {
            event.preventDefault();
            recoverForm.style.display = 'none';
            loginForm.style.display = 'flex';
            window.scrollTo({ top: 0, behavior: 'smooth' });

        });

    }

    if (dom.customerNavigationMobile) {

        dom.customerNavigationMobile.addEventListener('change', (event) => {
            const selectedLocation = event.target.value;
            window.location.href = selectedLocation;
        });

        const currentURL = window.location.href.replace('https://whitelabelisbetter.com', '');

        const options = dom.customerNavigationMobile.options;
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.value === currentURL) {
                option.selected = true;
                break;
            }
        }
    }
}

const savedAddressesBlock = () => {
    if (dom.savedAddressBlock) {
        _addAddress();
        _editAddress();
        _deleteAddress();
    }
}

const _addAddress = () => {
    const addAddressButton = dom.savedAddressBlock.querySelector('[data-add-address]');
    addAddressButton.addEventListener('click', (event) => {
        event.preventDefault();
        _showView(dom.addressAddView);
        _showProvinces(dom.addressAddView);
    });
}

const _editAddress = () => {
    const editAddressButtons = dom.savedAddressBlock.querySelectorAll('[data-edit-address]');
    editAddressButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedAddress = event.target.dataset.editAddress;
            const selectedAddressForm = dom.addressEditView.querySelector(`[data-address-form="${selectedAddress}"]`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            _showView(dom.addressEditView);
            _showView(selectedAddressForm);
            _showProvinces(selectedAddressForm);
        });
    });
}

const _deleteAddress = () => {
    const deleteAddressButtons = dom.savedAddressBlock.querySelectorAll('[data-target-delete]');
    deleteAddressButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            if (confirm('Are you sure you want to delete this address?') === false) {
            } else {
                const selectedAddress = event.target.dataset.targetDelete;
                try {
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = selectedAddress;
                    const methodInput = document.createElement('input');
                    methodInput.type = 'hidden';
                    methodInput.name = '_method';
                    methodInput.value = 'delete';
                    form.appendChild(methodInput);
                    document.body.appendChild(form);
                    form.submit();
                    form.remove(); // Remove the form from the DOM after submission
                } catch (error) {
                    console.error('An error occurred while deleting the address', error);
                }
            }


        });
    });

}

const _showView = (view) => {
    dom.addressListView.style.display = 'none';
    dom.pagination ? dom.pagination.style.display = 'none' : null;
    view.style.display = 'block';
    _resetView();
}

const _resetView = () => {
    document.addEventListener('click', event => {
        if (event.target.classList.contains('reset')) {
            dom.addressListView.style.display = 'block';
            dom.pagination ? dom.pagination.style.display = 'block' : null;
            dom.addressEditView.style.display = 'none';
            dom.addressAddView.style.display = 'none';
            const addressForms = document.querySelectorAll('[data-address-form]');
            addressForms.forEach(form => {
                form.style.display = 'none';
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });

        }
    });
}

const _showProvinces = (parent) => {
    const countrySelect = parent.querySelector('#AddressCountryNew');
    const provinceContainer = parent.querySelector('#AddressProvinceContainerNew');
    const provinceSelect = provinceContainer.querySelector('#AddressProvinceNew');

    const updateProvinces = (selectedOption) => {
        const provincesData = JSON.parse(selectedOption.getAttribute('data-provinces') || '[]');

        const emptyBlock = parent.querySelector('#emptyBlock');

        provinceSelect.innerHTML = '';

        provincesData.forEach(([provinceName, provinceValue]) => {
            const option = new Option(provinceName, provinceValue);
            provinceSelect.add(option);
        });
        provinceContainer.style.display = provincesData.length ? 'block' : 'none';

        emptyBlock.style.display = provincesData.length ? 'none' : 'block';
    };

    updateProvinces(countrySelect.options[countrySelect.selectedIndex]);

    const defaultCountry = countrySelect.getAttribute('data-default');
    const defaultProvince = provinceSelect.getAttribute('data-default');

    if (defaultCountry) {
        countrySelect.value = defaultCountry;
        updateProvinces(countrySelect.options[countrySelect.selectedIndex]);
    }

    if (defaultProvince) {
        console.log('defaultProvince', defaultProvince);
        provinceSelect.value = defaultProvince;
    }

    countrySelect.addEventListener('change', (event) => {
        updateProvinces(event.target.options[event.target.selectedIndex]);
    });
}

const _toggleExpanded = (target) => {
    const isExpanded = target.getAttribute(attributes.expanded) === 'true';
    target.setAttribute(attributes.expanded, !isExpanded);
}

const Account = {
    init() {
        cacheDom()
        recoverAccountToggle()
        savedAddressesBlock();
    }
}

export default Account
