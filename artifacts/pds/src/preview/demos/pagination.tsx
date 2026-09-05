import { Pagination } from '../../components/ui/pagination';
import { Row } from '../parts';

export function PaginationDemo() {
  return (
    <div className="p-6">
      <div className="space-y-5">
        <Row label="Page 3 of 10 (windowing with ellipsis)">
          <Pagination total={10} current={3} />
        </Row>
        <Row label="Page 24 of 60 - long range, gaps collapse to ellipses">
          <Pagination total={60} current={24} />
        </Row>
        <Row label="First / last page (boundary arrows disabled)">
          <div className="flex flex-wrap gap-8 items-center">
            <Pagination total={7} current={1} />
            <Pagination total={7} current={7} />
          </div>
        </Row>
      </div>
    </div>
  );
}
