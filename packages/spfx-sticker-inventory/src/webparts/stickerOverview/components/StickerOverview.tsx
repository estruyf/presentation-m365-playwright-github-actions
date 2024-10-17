import * as React from 'react';
import { DefaultButton, Icon, Spinner, TextField } from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http-base';
import './StickerOverview.module.scss';

export interface IStickerOverviewProps {
  min: number;
  imageHeight: number;
  context: WebPartContext;
}

interface ISticker {
  Id: number;
  Title: string;
  Description: string;
  Image: string;
  Price: number;
  Total: number;
}

export const StickerOverview: React.FunctionComponent<IStickerOverviewProps> = ({
  context,
  min,
  imageHeight,
}: React.PropsWithChildren<IStickerOverviewProps>) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [stickers, setStickers] = React.useState<ISticker[]>([]);
  const [filter, setFilter] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const fetchStickers = async (minimalAmount: number): Promise<void> => {
    setLoading(true);
    setStickers([]);
    setError('');

    const webAbsoluteUrl = context.pageContext.web.absoluteUrl;
    const httpClient = context.spHttpClient;
    let listApiUrl = `${webAbsoluteUrl}/_api/web/lists/getbytitle('Inventory')/items?$select=Id,Title,Description,Image,Price,Total`;

    // Order by the Modified
    listApiUrl += '&$orderby=Modified desc';

    if (minimalAmount > 0) {
      listApiUrl += `&$filter=Total ge ${minimalAmount}`;
    }

    try {
      const response = await httpClient.get(listApiUrl, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        const items = result.value as ISticker[];
        setStickers(items);
      } else {
        setError(`Error fetching stickers: ${response.status}`);
      }
    } catch (err) {
      setError(`Error fetching stickers${(err as Error).message ? `: ${(err as Error).message}` : ''}`);
    } finally {
      setLoading(false);
    }
  };

  const getStockColor = (stock: number): string => {
    if (stock > 25) {
      return 'bg-green-50';
    } else if (stock > 10 && stock <= 25) {
      return 'bg-yellow-100';
    } else {
      return 'bg-red-100';
    }
  }

  React.useEffect(() => {
    fetchStickers(min);
  }, [min]);

  return (
    <section
      className='sticker_inventory w-full'
      data-testid="sticker_inventory"
    >
      {
        error && (
          <div
            className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4`}
            role="alert"
            data-testid="sticker_inventory__error">
            <span className="block sm:inline">{error}</span>
          </div>
        )
      }

      <div className='grid grid-cols-3 gap-4 justify-between items-center mb-4'>
        <TextField
          type='number'
          placeholder='Filter by stock'
          value={filter}
          onChange={(_, value) => setFilter(value || '')}
          data-testid="sticker_inventory__filter__input"
          className='w-full' />

        <div>
          <DefaultButton
            onClick={() => fetchStickers(parseInt(filter) || 0)}
            data-testid="sticker_inventory__filter__button"
          >
            <Icon iconName='Filter' />
            &nbsp; Filter
          </DefaultButton>
        </div>

        <div
          className='text-lg font-bold text-right w-full'
          data-testid="sticker_inventory__refresh">
          Last refresh: {(new Date()).toLocaleTimeString()}
        </div>
      </div>

      {
        stickers.length > 0 ? (
          <div
            className='grid grid-cols-3 gap-4'
            data-testid="sticker_inventory__overview">
            {
              stickers.map((sticker) => (
                <div
                  key={sticker.Id}
                  className='group bg-white rounded-md shadow-md overflow-hidden'
                  data-testid="sticker_inventory__overview__sticker">
                  <div className='relative'>
                    <img
                      src={`https://ik.imagekit.io/pyodstickers/tr:w-250,h-${imageHeight || 200}/stickers/${sticker.Image}`}
                      alt={sticker.Title}
                      className={`w-full object-cover ${imageHeight ? "" : "h-48"}`} />

                    <div
                      className='hidden absolute inset-0 group-hover:flex items-center justify-center bg-black bg-opacity-50 backdrop-blur p-2'
                      data-testid='sticker_inventory__sticker__description'>
                      <div className='text-white text-center'>
                        <p className='text-sm'>{sticker.Description}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 ${getStockColor(sticker.Total)}`}>
                    <h3 className='text-lg font-bold'>{sticker.Title}</h3>
                    <div className='flex items-center justify-between'>
                      <div className='text-lg font-bold'>€ <span data-testid="sticker_inventory__sticker__price">{sticker.Price}</span></div>
                      <div className='text-sm text-gray-500'>Stock: <span data-testid="sticker_inventory__sticker__total">{sticker.Total}</span></div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div
            className='bg-white flex items-center justify-center'
            data-testid="sticker_inventory__empty">
            <p>No stickers found</p>
          </div>
        )
      }

      {
        loading && (
          <div
            className={`bg-white bg-opacity-50 backdrop-blur absolute inset-0 flex items-center justify-center`}
            data-testid="sticker_inventory__spinner">
            <Spinner label={`Fetching stickers`} />
          </div>
        )
      }
    </section>
  );
};
