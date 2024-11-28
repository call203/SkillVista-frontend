import { forwardRef, MouseEventHandler, useEffect, useState, CSSProperties } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PlaceholderImage from '../../../public/placeholder_services.png'
import { TUserDashboardTable } from './columns'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/store/authSlice'
import { FixedSizeGrid as Grid } from 'react-window'
import useWindowSize from '@/store/customhook.ts/serviceListHook'

interface IProps {
  data: TUserDashboardTable[]
  userType: string
  clickChat: () => void
  handleClickInfoForChat: (value: TUserDashboardTable) => void
  handleDeleteService: (service_id: string) => MouseEventHandler<HTMLButtonElement> | undefined
}

interface IRenderProps {
  columnIndex: number
  rowIndex: number
  style: CSSProperties
}

const GUTTER_SIZE = 10

export default function DataCards({
  data,
  userType,
  clickChat,
  handleClickInfoForChat,
  handleDeleteService,
}: IProps) {
  const authState = useSelector(selectAuthState)
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const [numColumns, setNumColumns] = useState(4)
  const [boxWidth, setBoxWidth] = useState(200)

  // Set more style for Grid
  const innerElementType = forwardRef<HTMLDivElement, { style: CSSProperties }>(
    ({ style, ...rest }, ref) => (
      <div
        ref={ref}
        style={{
          ...style,
          paddingLeft: GUTTER_SIZE,
          paddingTop: GUTTER_SIZE,
        }}
        {...rest}
      />
    ),
  )
  innerElementType.displayName = 'InnerElementType'

  useEffect(() => {
    if (windowWidth < 768) {
      setNumColumns(2)
      setBoxWidth(180)
    } else if (windowWidth >= 768 && windowWidth < 1024) {
      setNumColumns(3)
      setBoxWidth(220)
    } else {
      setNumColumns(4)
      setBoxWidth(230)
    }
  }, [windowWidth])

  const RenderCell = ({ columnIndex, rowIndex, style }: IRenderProps) => {
    const itemIndex = rowIndex * 4 + columnIndex
    const service = data[itemIndex]

    if (!service) return null

    return (
      <Card
        style={{
          ...style,
          left: style.left + GUTTER_SIZE,
          top: style.top + GUTTER_SIZE,
          width: style.width - GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
        }}
        className={'GridItem '}
      >
        <Image
          src={service?.service_image_url ? service?.service_image_url : PlaceholderImage}
          className="h-[50%] w-full rounded-t-lg"
          alt="placeholder-image"
          width={100}
          height={100}
        />
        <CardHeader className="2xl:pt-3">
          <CardTitle>{service?.short_description}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Availability: {service?.availability}</li>
            <li>Pricing: {service?.pricing}</li>
          </ul>
        </CardContent>
      </Card>
    )
  }

  return (
    <Grid
      className="Grid no-scrollbar"
      columnCount={numColumns}
      columnWidth={boxWidth + GUTTER_SIZE}
      height={windowHeight}
      rowCount={Math.ceil(data.length / numColumns)}
      rowHeight={350 + GUTTER_SIZE}
      width={boxWidth * numColumns + GUTTER_SIZE * 2 * numColumns - 20}
      innerElementType={innerElementType}
    >
      {RenderCell}
    </Grid>
  )
}
